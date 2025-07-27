import Fastify from 'fastify';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { prisma } from '../src/lib/prisma.js';
import envSetup from '../src/plugins/env.js';
import corsSetup from '../src/plugins/cors.js';
import notesRoutes from '../src/routes/notes.js';
import { createBrief } from '../src/utils/brief.js';

describe('/notes routes', () => {
  let app: ReturnType<typeof Fastify>;
  let briefId: string;
  let noteId: string;
  let briefDate: string;

  beforeAll(async () => {
    app = Fastify().withTypeProvider<TypeBoxTypeProvider>();
    app.register(envSetup);
    app.register(corsSetup);
    app.register(notesRoutes);
    await app.ready();
  });

  beforeEach(async () => {
    // Create a brief and a note for it
    const brief = await createBrief();
    briefId = brief.id;
    briefDate = brief.createdAt.toISOString().split('T')[0];

    const note = await prisma.note.create({
      data: {
        briefId,
        content: 'Test note content',
      },
    });
    noteId = note.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /briefs/:briefId/notes returns notes for a brief', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/briefs/${briefId}/notes`,
    });

    expect(res.statusCode).toBe(200);

    const notes = await res.json();
    expect(Array.isArray(notes)).toBe(true);
    expect(notes[0]).toMatchObject({
      id: noteId,
      briefId,
      content: 'Test note content',
    });
  });

  it('GET /briefs/date/:date/notes returns notes for a brief by date', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/briefs/date/${briefDate}/notes`,
    });

    expect(res.statusCode).toBe(200);

    const notes = await res.json();
    expect(Array.isArray(notes)).toBe(true);
    expect(notes[0]).toMatchObject({
      id: noteId,
      briefId,
      content: 'Test note content',
    });
  });

  it('POST /briefs/:briefId/notes creates a note', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `/briefs/${briefId}/notes`,
      payload: { content: 'Another note' },
    });

    expect(res.statusCode).toBe(201);

    const note = await res.json();
    expect(note).toMatchObject({
      briefId,
      content: 'Another note',
    });
    // Confirm it exists in DB
    const found = await prisma.note.findUnique({ where: { id: note.id } });
    expect(found).not.toBeNull();
  });

  it('PATCH /notes/:id updates a note', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: `/notes/${noteId}`,
      payload: { content: 'Updated content' },
    });

    expect(res.statusCode).toBe(200);

    const note = await res.json();
    expect(note.content).toBe('Updated content');
    // Confirm in DB
    const found = await prisma.note.findUnique({ where: { id: noteId } });
    expect(found?.content).toBe('Updated content');
  });

  it('DELETE /notes/:id deletes a note', async () => {
    const res = await app.inject({
      method: 'DELETE',
      url: `/notes/${noteId}`,
    });

    expect(res.statusCode).toBe(204);

    // Confirm deleted
    const found = await prisma.note.findUnique({ where: { id: noteId } });
    expect(found).toBeNull();
  });

  it('GET /briefs/:briefId/notes returns empty array for brief with no notes', async () => {
    await prisma.brief.deleteMany();
    // Create a brief with no notes
    const brief = await createBrief();
    const res = await app.inject({
      method: 'GET',
      url: `/briefs/${brief.id}/notes`,
    });

    expect(res.statusCode).toBe(200);

    const notes = await res.json();
    expect(Array.isArray(notes)).toBe(true);
    expect(notes.length).toBe(0);
  });

  it('GET /briefs/date/:date/notes returns 404 if no brief exists for date', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/briefs/date/1999-01-01/notes`,
    });

    expect(res.statusCode).toBe(404);
  });
});
