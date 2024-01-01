import { SignJWT, jwtVerify } from "jose";

export async function createJwtToken(value, secret, expireDate) {
    const token = await new SignJWT({ permissions: value })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expireDate)
        .sign(secret);
    return token
}

export async function verifyJwtToken(token, secret) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}