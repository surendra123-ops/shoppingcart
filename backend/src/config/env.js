import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mock-ecom-cart',
  jwtSecret: process.env.JWT_SECRET || 'supersecretmockkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  fakeStoreUrl: process.env.FAKE_STORE_URL || 'https://fakestoreapi.com/products?limit=8',
};

