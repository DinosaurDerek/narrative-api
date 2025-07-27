import { Type } from '@sinclair/typebox';

export const NoteSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  briefId: Type.String({ format: 'uuid' }),
  content: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
