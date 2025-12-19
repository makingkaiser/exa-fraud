# 🔎 Carrier Fraud Investigator
### Powered by [Exa.ai](https://exa.ai) - The Search Engine for AI Applications

![Screenshot](https://companyresearcher.exa.ai/opengraph-image.jpg)

<br>

## 🎯 What is Carrier Fraud Investigator?

Carrier Fraud Investigator is a powerful tool designed for the logistics industry to instantly vet trucking carriers. By simply entering a carrier's name or website, the tool leverages Exa's real-time search capabilities to identify potential risks, including:
- **Double-brokering patterns**
- **Strategic cargo theft indicators**
- **Inconsistent business registration data** (FMCSA/DOT records)
- **Negative industry reputation** and "do not load" alerts

The tool provides a nuanced risk score and categorized indicators to help logistics professionals make informed decisions.

<br>

## 📊 Data Sources & Fraud Detection Logic
> All data is fetched using Exa's powerful search API, then analyzed by Claude 3.5 Sonnet to identify risk patterns.

1. **Official Records & Compliance**
   - FMCSA/DOT registration status
   - Safety rating history
   - Business longevity verification

2. **Reputation & Industry Alerts**
   - Logistics industry forums and review sites
   - "Do Not Load" lists and cargo theft alerts
   - Historical fraud complaints

3. **Digital Presence Verification**
   - Website domain age vs. claimed company age
   - Consistency of contact information (phone, address, email)
   - Social media and professional profile verification

<br>

## 💻 Tech Stack
- **Search Engine**: [Exa.ai](https://exa.ai) - Optimized for real-time web data and clean content extraction
- **Frontend**: [Next.js](https://nextjs.org/docs) with App Router, [TailwindCSS](https://tailwindcss.com), TypeScript
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs/ai-sdk-core) with Anthropic's Claude 3.5 Sonnet
- **Hosting**: [Vercel](https://vercel.com/)

<br>

## 🚀 Getting Started

### Prerequisites
- Node.js
- Exa.ai API key
- Anthropic API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/makingkaiser/exa-fraud.git
cd exa-fraud/exa-company
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the `exa-company` directory:

```env
EXA_API_KEY=your_exa_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Run the development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

<br>

## ⭐ About [Exa.ai](https://exa.ai)

This project is powered by [Exa.ai](https://exa.ai), a search engine designed specifically for AI applications. Exa's `searchAndContents` API allows the Investigator to:
- Perform deep searches for specific carrier reputations.
- Extract clean text from FMCSA and industry forum pages.
- Use `livecrawl: 'always'` to ensure the latest safety records and alerts are analyzed.

[Try Exa search](https://exa.ai/search)

<br>

---

Built with ❤️ using Exa.ai
