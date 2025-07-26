import { Type } from '@sinclair/typebox';

export const NarrativeRecordSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  topic: Type.String(),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
  briefId: Type.String({ format: 'uuid' }),
});

export const BriefSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  narratives: Type.Array(NarrativeRecordSchema),
});
