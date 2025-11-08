import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const defaultUser = {
  name: 'Demo Shopper',
  email: 'demo@vibecommerce.com',
  password: 'Password123!',
};

export const ensureDefaultUser = async () => {
  const existing = await User.findOne({ email: defaultUser.email });
  if (existing) {
    return existing;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(defaultUser.password, salt);

  const user = await User.create({
    name: defaultUser.name,
    email: defaultUser.email,
    password: hashedPassword,
  });

  console.log(`Seeded demo user: ${user.email}`);
  return user;
};

export const findUserByEmail = (email) => User.findOne({ email });

export const createUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const error = new Error('User already exists');
    error.status = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return user;
};

