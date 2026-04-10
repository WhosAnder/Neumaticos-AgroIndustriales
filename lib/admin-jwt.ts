import { createHmac } from "crypto"

const ISSUER = "next-admin"
const AUDIENCE = "nei-api-admin"
const DEFAULT_TTL_SECONDS = 120

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url")
}

export function createAdminApiToken({
  userId,
  email,
}: {
  userId: string
  email?: string
}) {
  const secret = process.env.ADMIN_API_JWT_SECRET
  if (!secret) {
    throw new Error("Falta ADMIN_API_JWT_SECRET en Next.js")
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    sub: userId,
    email,
    role: "admin",
    iss: ISSUER,
    aud: AUDIENCE,
    iat: now,
    exp: now + DEFAULT_TTL_SECONDS,
  }

  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const encodedHeader = encodeBase64Url(JSON.stringify(header))
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const unsignedToken = `${encodedHeader}.${encodedPayload}`
  const signature = createHmac("sha256", secret).update(unsignedToken).digest("base64url")

  return `${unsignedToken}.${signature}`
}
