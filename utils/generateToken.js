// generateToken.js
// Utility to generate JWT token for authentication

import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user
 * @param {Object} payload - Data to encode in the token (e.g., user id)
 * @param {String} secret - JWT secret key
 * @param {Object} options - Optional JWT options (e.g., expiresIn)
 * @returns {String} JWT token
 */
function generateToken(payload, secret, options = { expiresIn: '1d' }) {
    if (!secret) throw new Error('JWT secret is required');
    return jwt.sign(payload, secret, options);
}

export default generateToken;
