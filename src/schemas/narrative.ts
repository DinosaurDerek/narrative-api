import { Type } from '@sinclair/typebox';

export const NarrativeSchema = Type.Object({
  topic: Type.String(),
  narrative: Type.String(),
  summaryCount: Type.Number(),
  sources: Type.Array(Type.String()),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
});
