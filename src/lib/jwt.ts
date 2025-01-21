import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/**
 * Generates a JSON Web Token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} The generated JWT.
 */
export function generateToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET);
}

/**
 * Verifies a JSON Web Token and decodes its payload.
 *
 * @param {string} token - The JWT to verify.
 * @returns {object | string} The decoded token payload if the token is valid.
 * @throws {jwt.JsonWebTokenError} If the token is invalid.
 */
export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}