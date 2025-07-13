# Narrative API (Demo)

## Overview

This is a demo project showcasing a simple, well-structured backend API using Node.js, Fastify, and TypeScript. It aggregates mock data from two narrative-related sources—fact-check claims and topic summaries—and returns them in a unified response. While the data is mocked for now, the architecture is built to scale with real external APIs in the future.

This repo was created as a backend-focused portfolio piece to demonstrate API structure, type safety, modularity, and readiness for real-world integration.

## Endpoints

### `GET /narratives`

Returns a combined list of claims and summaries:

```json
{
  "claims": [
    {
      "claim": "Ethereum is switching to proof of stake",
      "claimant": "Vitalik Buterin",
      "reviewSource": "Google Fact Check (Mock)",
      "url": "https://example.com/eth-pos"
    }
  ],
  "summaries": [
    {
      "topic": "eth",
      "summary": "Ethereum has seen increased developer activity this week, with continued optimism around L2 scaling solutions.",
      "sentiment": "bullish"
    }
  ]
}
```

Future versions may allow query filtering (e.g. ?topic=eth).

## Tech Stack

- **Framework:** Fastify (Node.js)
- **Language:** Typescript
- **Schema Validation:** TypeBox
- **Structure:** Modular API per data source
- **API Fetching:** Axios (for real external data, if added later)

## Project Structure

```
src/
├── api/
│   ├── claims/        # Claim-fetching logic (mocked)
│   ├── summaries/     # Summary-fetching logic (mocked)
│   └── index.ts       # Aggregates narrative data
├── routes/
│   └── narratives.ts  # GET /narratives endpoint
├── types/             # Shared types (Claim, Summary)
└── server.ts          # Fastify setup
```

Each data source is isolated into its own module for scalability and clarity.

## How to Run

1. Clone the repo
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm run dev
   ```

## Future Improvements

This repo was built to serve as a flexible starting point for more advanced narrative aggregation tools. Future additions may include:

- Integrating real data from APIs like Google Fact Check, OpenAI, or RSS/news sources
- Generating summaries dynamically via LLMs
- Filtering or tagging narratives using NLP or crypto context
- Providing sentiment analysis for token/project discussions
