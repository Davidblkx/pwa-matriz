import { enc, Rabbit, SHA3 } from "crypto-js";

/**
 * Service to hash, encrypt and decrypt UTF-8 text
 *
 * @export
 * @class SecurityService
 */
export class SecurityService {
  /**
   * Hash a string and return hash string
   *
   * @static
   * @param {string} text text to hash
   * @returns {string} hashed response
   * @memberof SecurityService
   */
  public static hash(text: string): string {
    return SHA3(text, { outputLength: 512 }).toString(enc.Base64);
  }

  /**
   * Encrypts a text
   *
   * @static
   * @param {string} text text to encrypt
   * @param {string} passPhrase string to use as key
   * @returns
   * @memberof SecurityService
   */
  public static encrypt(text: string, passPhrase: string) {
    return Rabbit.encrypt(text, passPhrase).toString();
  }

  /**
   * Decrypts a source text using a pass phrase
   *
   * @static
   * @param {string} text
   * @param {string} passPhrase
   * @returns
   * @memberof SecurityService
   */
  public static decrypt(text: string, passPhrase: string) {
    return Rabbit.decrypt(text, passPhrase).toString(enc.Utf8);
  }
}
