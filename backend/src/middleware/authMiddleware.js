import { verifyToken } from '../utils/token.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/User.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Authorization token missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password').lean();
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Invalid token');
  }
});

