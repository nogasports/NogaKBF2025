import { AES, enc } from 'crypto-js';

export class Encryption {
  private static readonly SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key';

  static encrypt(data: string): string {
    return AES.encrypt(data, this.SECRET_KEY).toString();
  }

  static decrypt(encryptedData: string): string {
    const bytes = AES.decrypt(encryptedData, this.SECRET_KEY);
    return bytes.toString(enc.Utf8);
  }

  static encryptObject(obj: Record<string, any>): string {
    return this.encrypt(JSON.stringify(obj));
  }

  static decryptObject<T>(encryptedData: string): T {
    const decrypted = this.decrypt(encryptedData);
    return JSON.parse(decrypted);
  }
}