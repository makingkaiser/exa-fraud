// app/api/fraud/detect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 100;

const exa = new Exa(process.env.EXA_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { carrierName, websiteUrl } = await req.json();

    if (!carrierName) {
      return NextResponse.json({ error: 'Carrier Name is required' }, { status: 400 });
    }

    const registrationSearch = await exa.searchAndContents(
      `${carrierName} trucking carrier business registration safety rating history FMCSA records`,
      {
        numResults: 10,
        text: true,
        useAutoprompt: true
      }
    );

    const fraudSearch = await exa.searchAndContents(
      `${carrierName} carrier reputation reviews complaints suspicious activity cargo theft logistics industry forums`,
      {
        numResults: 10,
        text: true,
        useAutoprompt: true
      }
    );

    let websiteSearch = null;
    if (websiteUrl) {
      websiteSearch = await exa.searchAndContents(
        `site:${websiteUrl} contact information address phone number about us`,
        {
          numResults: 3,
          text: true
        }
      );
    }

    const fraudReportSchema = z.object({
      riskScore: z.number().min(0).max(100),
      riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']),
      summary: z.array(z.object({
        heading: z.string(),
        text: z.string()
      })),
      riskIndicators: z.array(z.object({
        indicator: z.string(),
        severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
        description: z.string()
      })),
      principals: z.array(z.object({
        name: z.string(),
        role: z.string(),
        linkedInUrl: z.string().optional()
      }))
    });

    const { object } = await generateObject({
      model: anthropic('claude-sonnet-4-5'),
      schema: fraudReportSchema,
      output: 'object',
      system: "You are an expert logistics risk analyst. Your goal is to identify operational risks and potential fraud in the trucking industry. DO NOT automatically assume that a lack of public records or FMCSA registration indicates fraud or a stolen identity. Instead, categorize these as 'Business Verification Gaps' or 'Documentation Deficiencies'. Focus on identifying actual red flags like mismatched contact info, known scam patterns, or recent malicious activity. Be objective and nuanced.",
      prompt: `
        Analyze the following research data for the carrier: ${carrierName}
        Website: ${websiteUrl || 'Not provided'}

        BUSINESS REGISTRATION & OFFICIAL DATA:
        ${JSON.stringify(registrationSearch.results, null, 2)}

        REPUTATION, REVIEWS & INDUSTRY ALERTS:
        ${JSON.stringify(fraudSearch.results, null, 2)}

        WEBSITE DATA:
        ${websiteSearch ? JSON.stringify(websiteSearch.results, null, 2) : 'No website data provided.'}

        Based on this information, generate a nuanced fraud and operational risk report.
        
        CRITICAL INSTRUCTIONS:
        1. If no FMCSA or official records are found, DO NOT label this as 'Fraud' or 'Stolen Identity'. Label it as 'Business Verification Gap' or 'Limited Public Record'.
        2. A lack of compliance data is an operational risk, not necessarily a fraudulent intent.
        3. Only flag 'Critical' or 'High' risk if there are explicit reports of theft, double-brokering scams, or clear evidence of impersonation (e.g., the website claims to be a 20-year-old company but was registered last week).
        4. Negative online reputation (e.g., reports of non-payment, cargo theft, or 'do not load' alerts in industry forums) MUST be categorized as a 'Critical' severity indicator.
        5. DO NOT flag simple name mismatches between different sources as an alert, as these are often due to clerical variations.
        6. Focus on 'Strategic Theft' indicators: recent domain changes, phone number mismatches across different sources, or use of free email providers for high-value load requests.

        Include:
        - A risk score (0-100) and risk level.
        - A summary of findings (max 6 points) with nuanced headings starting with an emoji (e.g., \"📋 Registration Status\", \"🔍 Fraud History\").
        - Specific risk indicators found (sorted by severity: Critical first, then High, Medium, Low).
        - Key personnel or principals identified.
      `
    });

    return NextResponse.json({ 
      report: object,
      relatedIncidents: fraudSearch.results 
    });

  } catch (error) {
    console.error('Fraud Detection API error:', error);
    return NextResponse.json({ error: `Fraud Detection API Failed | ${error}` }, { status: 500 });
  }
}
