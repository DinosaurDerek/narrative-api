import { Type } from '@sinclair/typebox';

export const QuerySchema = Type.Object({
  topic: Type.Optional(Type.String()),
});
