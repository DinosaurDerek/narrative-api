# Narrative API (Demo)

## Overview

This is a demo project showcasing a simple, well-structured backend API using Node.js, Fastify, and TypeScript. It aggregates mock data from multiple crypto-related sources — such as Farcaster posts, CoinDesk articles, and Decrypt news — and returns topic-based summaries with sentiment analysis. While the data is static for now, the architecture is built to support real external APIs.

The API also supports persistent, database-backed briefs: snapshots of topic-based narratives and sentiment, linked to their underlying summaries via a NarrativeRecord relation. These are stored in a PostgreSQL database using Prisma. For demo purposes, daily brief creation is triggered within the `/narratives` endpoint — this is a temporary solution pending support for automated jobs.

In addition, a full CRUD Notes feature was added for demonstration purposes, showing additional DB interactions and endpoint patterns.

The repo serves as a backend-focused demo, demonstrating modular design, type safety, structured logging, database integration, and readiness for real-world API integration.

> ⚠️ This is a demo. External sources are simulated with static data.

## Live Demo

- **Base URL:** https://narrative-api-kquv.onrender.com  
  → Use API key: `6d9a3c4f9b2e4389a53e0d1c7f4a3bce` (pass as `x-api-key` header)

- **Docs:** https://narrative-api-kquv.onrender.com/docs _(auto-generated Swagger UI)_  
  → View all available endpoints and request/response schemas

> Note: The live demo is hosted on a free-tier Render instance, which may take up to a few minutes to respond on the first request due to cold starts. Subsequent requests should respond normally.

## Tech Stack

- **Framework:** Fastify (Node.js)
- **Language:** TypeScript
- **Schema Validation:** TypeBox
- **Mock Data Sources:** Farcaster, CoinDesk, Decrypt
- **Testing:** Vitest + Fastify Inject
- **Logging:** Pino (structured logging)
- **Architecture:** Modular API per source
- **Docs:** OpenAPI via `@fastify/swagger`
- **Database:** PostgreSQL (via Prisma ORM)

## Project Structure

```
prisma/                 # Prisma schema and migrations
src/
├── api/
│   ├── coindesk/       # Mock CoinDesk summaries
│   ├── decrypt/        # Mock Decrypt summaries
│   ├── farcaster/      # Mock Farcaster post summaries
│   ├── index.ts        # Combines all summaries
├── lib/
├── middlewares/        # Fastify middleware (e.g. API key auth)
├── plugins/            # Fastify plugins (CORS, ENV)
├── routes/             # Route handlers (narratives, summaries, etc.)
├── schemas/            # TypeBox schemas for validation
├── types/              # Shared types (Summary, Narrative)
├── utils/
├── server.ts           # Fastify instance + registration
tests/                  # Unit + route tests

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
```

Create a `.env` file:

```env
API_KEYS=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/narrative
```

Update the `DATABASE_URL` as needed for your local Postgres setup.

Run initial DB migration:

```bash
yarn prisma migrate deploy
```

Start the server:

```bash
yarn prisma generate
yarn dev
```

Optional: Clear DB manually

```bash
yarn db:clear
```

## Running Tests

```bash
yarn test
```

The test setup includes:

- `.env.test` support (isolated test DB)
- Automatic DB reset before each test suite
- `--maxWorkers=1` to avoid race conditions with concurrent DB access

Before running tests, ensure your `.env.test` includes a valid `DATABASE_URL` for the test database.
Then run an initial migration:

```bash
yarn testdb:reset
```

## Future Improvements

This repo was built to serve as a flexible starting point for more advanced narrative aggregation tools. Future additions may include:

- Automate daily brief creation via scheduled job instead of generating in the `/narratives` endpoint (requires database host upgrade)
- Simplify import paths by avoiding .js extensions and explicit index filenames
- Integrate live APIs (e.g. Farcaster, RSS feeds, news APIs)
- Generating summaries dynamically via LLMs
- Topic-based narrative scoring or ranking
- Add DB seeding or import/export tools
- To run tests in parallel, look into per-file databases with Testcontainers or dynamic schemas
- Consider dotenv-flow to support both .env and .env.test if needed
