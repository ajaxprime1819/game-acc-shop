import crypto from "crypto";

const ALGO = "aes-256-gcm";

const key = Buffer.from(process.env.CRYPTO_KEY || "0123456789abcdef0123456789abcdef", "utf8"); // 32 bytes

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(data: string) {
  const b = Buffer.from(data, "base64");
  const iv = b.slice(0, 12);
  const tag = b.slice(12, 28);
  const text = b.slice(28);
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(text), decipher.final()]);
  return decrypted.toString("utf8");
}
