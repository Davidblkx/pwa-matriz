export function defaultValidator<T>(input: unknown): input is T {
  return typeof input !== "undefined" && input !== null;
}
