import { Static } from '@sinclair/typebox';
import { BriefInputSchema } from '../schemas/brief.js';

export type BriefInput = Static<typeof BriefInputSchema>;
