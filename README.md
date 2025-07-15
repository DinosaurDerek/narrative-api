# Narrative API (Demo)

## Overview

This is a demo project showcasing a simple, well-structured backend API using Node.js, Fastify, and TypeScript. It aggregates mock data from multiple crypto-related sources—such as Farcaster posts, CoinDesk articles, and Decrypt news—and returns topic-based summaries with sentiment analysis. While the data is static for now, the architecture is built to support real external APIs.

The repo serves as a backend-focused demo, demonstrating modular design, type safety, structured logging, and readiness for real-world API integration.

> ⚠️ This is a demo. All data is static and generated to simulate external sources.

## Live Demo

- **Base URL:** https://narrative-api.onrender.com  
  → Use API key: `6d9a3c4f9b2e4389a53e0d1c7f4a3bce` (pass as `x-api-key` header)

- **Docs:** https://narrative-api.onrender.com/docs _(auto-generated Swagger UI)_

## Endpoints

### `GET /narratives`

Returns high-level narratives by summarizing sentiment and source coverage per topic.  
Optional query: `?topic=ethereum`

```json
[
  {
    "topic": "ethereum",
    "narrative": "Ethereum is showing strength after ETF approval. Ethereum volumes spike as markets rebound.",
    "summaryCount": 2,
    "sources": ["decrypt", "coindesk"],
    "sentiment": "bullish"
  }
]
```

### `GET /summaries`

Returns all individual source summaries per topic.
Optional query: `?topic=ethereum`

```json
[
  {
    "topic": "bitcoin",
    "summary": "BTC dropped 3% after CPI release.",
    "sentiment": "bearish",
    "source": "decrypt"
  }
]
```

## Tech Stack

- **Framework:** Fastify (Node.js)
- **Language:** Typescript
- **Schema Validation:** TypeBox
- **Mock Data Sources:** Farcaster, CoinDesk, Decrypt
- **Testing:** Vitest + Fastify Inject
- **Logging:** Pino (structured logging)
- **Architecture:** Modular API per source
- **Docs:** OpenAPI via `@fastify/swagger`

## Project Structure

```
src/
├── api/
│   ├── coindesk/       # Mock CoinDesk summaries
│   ├── decrypt/        # Mock Decrypt summaries
│   ├── farcaster/      # Mock Farcaster post summaries
│   ├── index.ts        # Aggregates summaries
├── middlewares/        # Fastify middleware (e.g. API key auth)
├── routes/             # Route handlers (narratives, summaries)
├── schemas/            # TypeBox schemas for validation
├── types/              # Shared types (Summary, Narrative)
├── plugins/            # Fastify plugins (CORS, ENV)
├── server.ts           # Fastify instance + registration
└── tests/              # Unit + route tests

```

Each data source is isolated for clarity and future scalability.

## Authentication

This API uses a simple API key check via middleware on all routes.

To make requests:

1. Create a `.env` file:
   ```env
   API_KEYS=your_secret_key
   ```
2. Include the key in requests:
   ```
   GET /narratives
   Header: x-api-key: your_secret_key
   ```

## Getting Started

```bash
git clone https://github.com/DinosaurDerek/narrative-api
cd narrative-api
yarn install
yarn dev
```

## Running Tests

```
yarn test
```

## Future Improvements

This repo was built to serve as a flexible starting point for more advanced narrative aggregation tools. Future additions may include:

- Simplify import paths by avoiding .js extensions and explicit index filenames
- Integrate real APIs (e.g. Farcaster, RSS feeds, news APIs)
- Generating summaries dynamically via LLMs
- Topic-based narrative scoring or ranking
