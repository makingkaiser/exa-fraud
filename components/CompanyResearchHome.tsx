// CompanyResearchHome.tsx

"use client";
import { useState, FormEvent } from "react";
import { CompanySummarySkeleton } from "./skeletons/ResearchSkeletons";
import Link from "next/link";
import FraudDetectionDisplay from "./fraud/FraudDetectionDisplay";
import RelatedIncidents from "./fraud/RelatedIncidents";
import { Shield } from "lucide-react";

export default function CarrierFraudInvestigator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [companyUrl, setCompanyUrl] = useState("");
  const [fraudReport, setFraudReport] = useState<any>(null);
  const [relatedIncidents, setRelatedIncidents] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFraudResearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!companyUrl) {
      setErrors({ form: "Please enter a Carrier Name or Website" });
      return;
    }

    setIsGenerating(true);
    setErrors({});
    setFraudReport(null);
    setRelatedIncidents([]);

    try {
      const response = await fetch("/api/fraud/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carrierName: companyUrl, // Using the same input field for name/website
          websiteUrl: companyUrl.includes(".") ? companyUrl : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Fraud detection failed");
      }

      const data = await response.json();
      setFraudReport(data.report);
      setRelatedIncidents(data.relatedIncidents);
    } catch (error) {
      console.error("Error in fraud research:", error);
      setErrors({
        fraud:
          error instanceof Error
            ? error.message
            : "An error occurred during fraud investigation",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl p-6 z-10 mb-20 mt-6">
      <h1 className="md:text-6xl text-4xl pb-5 font-medium opacity-0 animate-fade-up [animation-delay:200ms]">
        <span className="text-red-600"> Carrier </span>
        Fraud Investigator
      </h1>

      <p className="text-black mb-12 opacity-0 animate-fade-up [animation-delay:400ms]">
        Enter a carrier name or website to detect potential fraud,
        double-brokering, and strategic risks. Powered by Exa.
      </p>

      <form onSubmit={handleFraudResearch} className="space-y-6 mb-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            placeholder="Carrier Name or Website"
            className="flex-1 bg-white p-3 border box-border outline-none rounded-sm resize-none opacity-0 animate-fade-up [animation-delay:600ms]"
          />
        </div>
        <button
          type="submit"
          className={`w-full text-white font-semibold px-2 py-2 rounded-sm transition-opacity opacity-0 animate-fade-up [animation-delay:800ms] min-h-[50px] ${
            isGenerating ? "bg-gray-400" : "bg-red-600 ring-2 ring-red-600"
          } transition-colors`}
          disabled={isGenerating}
        >
          {isGenerating ? "Investigating..." : "Detect Fraud Patterns"}
        </button>

        <div className="flex items-center justify-end gap-2 sm:gap-3 pt-4 opacity-0 animate-fade-up [animation-delay:1000ms]">
          <span className="text-gray-800">Powered by</span>
          <a
            href="https://exa.ai"
            target="_blank"
            rel="origin"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/exa_logo.png"
              alt="Exa Logo"
              className="h-6 sm:h-7 object-contain"
            />
          </a>
        </div>
      </form>

      {Object.entries(errors).map(([key, message]) => (
        <div
          key={key}
          className="mt-4 mb-4 p-3 bg-red-100 border border-red-400 text-red-700"
        >
          {message}
        </div>
      ))}

      <div className="space-y-12">
        <div className="space-y-16">
          {isGenerating && fraudReport === null ? (
            <div className="space-y-12">
              <CompanySummarySkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
              </div>
            </div>
          ) : (
            fraudReport && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms] space-y-16">
                <FraudDetectionDisplay report={fraudReport} />
                {relatedIncidents.length > 0 && (
                  <RelatedIncidents incidents={relatedIncidents} />
                )}
              </div>
            )
          )}
          {!isGenerating && !fraudReport && !errors.fraud && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
              <Shield size={64} className="opacity-20" />
              <p>Enter carrier details above to start fraud investigation</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow"></div>
      <footer className="fixed bottom-0 left-0 right-0 w-full py-4 bg-secondary-default border-t opacity-0 animate-fade-up [animation-delay:1200ms]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:gap-6 px-4">
          <Link
            href="https://github.com/makingkaiser/exa-fraud"
            target="_blank"
            rel="origin"
            className="text-gray-600 hover:underline cursor-pointer text-center"
          >
            View Project Code
          </Link>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <Link
            href="https://exa.ai/demos"
            target="_blank"
            rel="origin"
            className="hover:opacity-80 transition-opacity hidden sm:inline"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600 hover:text-gray-600 hover:underline">
                See More Demos
              </span>
            </div>
          </Link>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <Link
            href="https://dashboard.exa.ai"
            target="_blank"
            rel="origin"
            className="hover:opacity-80 transition-opacity hidden sm:inline"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600 hover:text-gray-600 hover:underline">
                Try Exa API
              </span>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
