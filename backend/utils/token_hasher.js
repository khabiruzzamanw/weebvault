export function hash_token(token) {
  return new Bun.CryptoHasher("sha256").update(String(token)).digest("hex");
}
