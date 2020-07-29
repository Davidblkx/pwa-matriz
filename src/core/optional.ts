import { defaultValidator } from "./default-validator";

export type TypeValidator<T> = (input: unknown) => input is T;

/**
 *  helper for null and undefined
 */
export class Optional<T> {
  private _value?: T;
  private _validator?: TypeValidator<T>;

  public hasValue(): boolean {
    return this.validate(this._value);
  }

  public get(): T {
    if (this.validate(this._value)) {
      return this._value;
    }

    throw new Error("Type has no value");
  }

  public constructor(value?: T, validator?: TypeValidator<T>) {
    this._value = value;
    this._validator = validator;
  }

  public static some<T>(
    value: T | undefined,
    validator?: TypeValidator<T>
  ): Optional<T> {
    return new Optional(value, validator);
  }

  public static none<T>(): Optional<T> {
    return new Optional<T>();
  }

  private validate(input: unknown): input is T {
    if (typeof this._validator !== "undefined") {
      return this._validator(input);
    }

    return defaultValidator(input);
  }
}
