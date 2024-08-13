import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const key = new TextEncoder().encode(secretKey);
const alg = 'HS256';

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('15 min from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, { algorithms: [alg] });
  return payload;
}
