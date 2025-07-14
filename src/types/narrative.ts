export type Narrative = {
  topic: string;
  narrative: string;
  summaryCount: number;
  sources: string[];
  sentiment: 'bullish' | 'neutral' | 'bearish';
};
