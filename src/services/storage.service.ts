import { Optional, TypeValidator } from "../core/optional";
import { SecurityService } from "./security.service";

const _localStore: { [key: string]: string } = {};

export class StorageService {
  public set<T>(key: string, value: T): void {
    this.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string, validator?: TypeValidator<T>): Optional<T> {
    const stringValue = this.getItem(key);
    return Optional.some<T>(this.parse<T>(stringValue), validator);
  }

  public setEncrypted<T>(key: string, pass: string, value: T): void {
    const stringObj = JSON.stringify(value);
    this.setItem(key, SecurityService.encrypt(stringObj, pass));
  }

  public getEncrypted<T>(
    key: string,
    pass: string,
    validator?: TypeValidator<T>
  ): Optional<T> {
    const stringValue = this.decrypt(this.getItem(key), pass);
    return Optional.some<T>(this.parse<T>(stringValue), validator);
  }

  private decrypt(text: string | undefined, pass: string) {
    if (!text) {
      return undefined;
    }
    return SecurityService.decrypt(text, pass);
  }

  private parse<T>(input: string | undefined): T | undefined {
    try {
      return JSON.parse(input || "");
    } catch {
      return undefined;
    }
  }

  private setItem(key: string, value: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    } else {
      _localStore[key] = value;
    }
  }

  private getItem(key: string): string | undefined {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key) || undefined;
    } else {
      return _localStore[key];
    }
  }

  public static create(): StorageService {
    return new StorageService();
  }
}
