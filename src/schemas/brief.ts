import { Type } from '@sinclair/typebox';

export const BriefSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  date: Type.String({ format: 'date-time' }),
  topic: Type.String(),
  content: Type.Unknown(),
  createdAt: Type.String({ format: 'date-time' }),
});

export const BriefInputSchema = Type.Object({
  date: Type.String({ format: 'date-time' }),
  topic: Type.String(),
  content: Type.Unknown(),
});
