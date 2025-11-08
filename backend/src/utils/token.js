import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (payload, options = {}) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn, ...options });

export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

