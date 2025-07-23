import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import envSetup from '../src/plugins/env.js';
import corsSetup from '../src/plugins/cors.js';
import briefsRoutes from '../src/routes/briefs.js';

describe('/briefs endpoints', () => {
  let app: ReturnType<typeof Fastify>;
  let createdId: string;

  beforeAll(async () => {
    app = Fastify().withTypeProvider<TypeBoxTypeProvider>();
    app.register(envSetup);
    app.register(corsSetup);
    app.register(briefsRoutes);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /briefs returns an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/briefs',
    });

    expect(response.statusCode).toBe(200);

    const result = await response.json();

    expect(Array.isArray(result)).toBe(true);
  });

  it('POST /briefs creates a new brief', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/briefs',
      payload: {
        date: new Date().toISOString(),
        topic: 'test-topic',
        content: { msg: 'hello' },
      },
    });

    expect(response.statusCode).toBe(201);

    const result = await response.json();

    expect(result).toHaveProperty('id');
    expect(result.topic).toBe('test-topic');
    expect(result.content).toEqual({ msg: 'hello' });

    createdId = result.id;
  });

  it('GET /briefs?topic=test-topic returns filtered results', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/briefs?topic=test-topic',
    });

    expect(response.statusCode).toBe(200);

    const result = await response.json();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.topic.toLowerCase()).toBe('test-topic');
    });
  });

  it('PUT /briefs/:id updates the brief', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: `/briefs/${createdId}`,
      payload: {
        date: new Date().toISOString(),
        topic: 'updated-topic',
        content: { msg: 'updated' },
      },
    });

    expect(response.statusCode).toBe(200);

    const result = await response.json();

    expect(result.topic).toBe('updated-topic');
    expect(result.content).toEqual({ msg: 'updated' });
  });

  it('DELETE /briefs/:id deletes the brief', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/briefs/${createdId}`,
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toBe('');
  });
});
