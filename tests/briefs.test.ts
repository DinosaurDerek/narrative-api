import Fastify from 'fastify';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import envSetup from '../src/plugins/env.js';
import corsSetup from '../src/plugins/cors.js';
import briefsRoutes from '../src/routes/briefs.js';
import { createBrief } from '../src/utils/brief.js';

describe('/briefs routes', () => {
  let app: ReturnType<typeof Fastify>;
  let briefId: string;
  let briefDate: string;

  beforeAll(async () => {
    app = Fastify().withTypeProvider<TypeBoxTypeProvider>();
    app.register(envSetup);
    app.register(corsSetup);
    app.register(briefsRoutes);
    await app.ready();
  });

  beforeEach(async () => {
    const brief = await createBrief([
      {
        topic: 'crypto',
        sentiment: 'bullish',
      },
    ]);
    briefId = brief.id;
    briefDate = brief.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /briefs returns briefs with nested narratives', async () => {
    const res = await app.inject({ method: 'GET', url: '/briefs' });
    expect(res.statusCode).toBe(200);
    const result = await res.json();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('narratives');
    expect(Array.isArray(result[0].narratives)).toBe(true);
    expect(result[0].narratives[0]).toMatchObject({
      topic: 'crypto',
      sentiment: 'bullish',
      briefId,
    });
  });

  it('GET /briefs/:id returns a single brief with narratives', async () => {
    const res = await app.inject({ method: 'GET', url: `/briefs/${briefId}` });
    expect(res.statusCode).toBe(200);
    const brief = await res.json();

    expect(brief.id).toBe(briefId);
    expect(Array.isArray(brief.narratives)).toBe(true);
    expect(brief.narratives.length).toBeGreaterThan(0);
  });

  it('GET /briefs/date/:date returns brief for that day', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/briefs/date/${briefDate}`,
    });
    expect(res.statusCode).toBe(200);
    const brief = await res.json();

    expect(brief.id).toBe(briefId);
    expect(Array.isArray(brief.narratives)).toBe(true);
  });

  it('GET /briefs/:id returns 404 for nonexistent brief', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/briefs/00000000-0000-0000-0000-000000000000',
    });
    expect(res.statusCode).toBe(404);
  });

  it('GET /briefs/date/:date returns 404 if no brief exists', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/briefs/date/1999-01-01',
    });
    expect(res.statusCode).toBe(404);
  });
});
