import { Type } from '@sinclair/typebox';

export const HealthSchema = Type.Object({
  status: Type.String(),
});
