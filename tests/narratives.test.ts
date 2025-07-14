import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import envSetup from '../src/plugins/env.js';
import corsSetup from '../src/plugins/cors.js';
import narrativesRoutes from '../src/routes/narratives.js';

describe('GET /narratives', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify().withTypeProvider<TypeBoxTypeProvider>();
    app.register(envSetup);
    app.register(corsSetup);
    app.register(narrativesRoutes);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns an array of narratives', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/narratives',
    });

    expect(response.statusCode).toBe(200);
    const result = await response.json();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('topic');
    expect(result[0]).toHaveProperty('narrative');
    expect(result[0]).toHaveProperty('sentiment');
  });

  it('can filter narratives by topic', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/narratives?topic=bitcoin',
    });

    expect(response.statusCode).toBe(200);
    const result = await response.json();

    expect(Array.isArray(result)).toBe(true);
    result.forEach(item => {
      expect(item.topic.toLowerCase()).toBe('bitcoin');
    });
  });
});
