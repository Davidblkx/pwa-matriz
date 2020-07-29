import { defaultValidator } from "@/core/default-validator";

export interface MatrixEntry {
  name: string;
  signature: string;
}

export function isMatrixEntry(input: unknown): input is MatrixEntry {
  return (
    defaultValidator(input) &&
    typeof input === "object" &&
    typeof (input as MatrixEntry).name === "string" &&
    typeof (input as MatrixEntry).signature === "string"
  );
}

export function isMatrixEntryArray(input: unknown): input is MatrixEntry[] {
  if (!Array.isArray(input)) {
    return false;
  }
  for (const v of input) {
    if (!isMatrixEntry(v)) {
      return false;
    }
  }
  return true;
}
