import { Static } from '@sinclair/typebox';

import { QuerySchema } from '../schemas/query.js';

export type QueryType = Static<typeof QuerySchema>;
