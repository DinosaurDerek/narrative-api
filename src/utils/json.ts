export function isJsonCompatible(value: unknown): value is Record<string, any> {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}
