import { webcrypto } from "crypto";

/**
 * This function validates the hash validation on the server. The hash is included in a custom header with each request, containing user information encrypted as a hash. By utilizing a secret token, this function decodes the hash, validating the initial request.
 * It is used in two of my services, validating all the requests, that are comming from Telegram app messanger.
 * @param { String } urlHash 
 * @param { String } token 
 * @returns { Boolean }
 */
export async function isHashValid(urlHash, token) {
  const data = Object.fromEntries(new URLSearchParams(urlHash));
  const encoder = new TextEncoder();

  const checkString = Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");

  const secretKey = await webcrypto.subtle.importKey(
    "raw",
    encoder.encode("WebAppData"),
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );

  const secret = await webcrypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(token)
  );

  const signatureKey = await webcrypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );

  const signature = await webcrypto.subtle.sign(
    "HMAC",
    signatureKey,
    encoder.encode(checkString)
  );

  const hex = Buffer.from(signature).toString("hex");
  console.log({ hex });
  return {
    isValid: data.hash === hex,
    hash: data.hash === hex ? hex : undefined,
  };
}
