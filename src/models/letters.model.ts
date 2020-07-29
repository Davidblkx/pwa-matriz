export function getLetterNumber(value: string | number): number {
  if (typeof value === "number") {
    return value - 1;
  }

  if (typeof value === "string" && !!value) {
    return value.toUpperCase().charCodeAt(0) - 65;
  }

  throw new Error("Invalid string");
}

export function getNumberLetter(value: number): string {
  return String.fromCharCode(65 + value);
}
