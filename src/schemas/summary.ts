import { Type } from '@sinclair/typebox';

export const SummarySchema = Type.Object({
  topic: Type.String(),
  summary: Type.String(),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
  source: Type.String(),
});
