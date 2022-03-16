import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = 'pregnancyWheel';

export const makeJWT = (userId: string) => {
  return sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyJWT = (token: string) => {
  try {
    const { userId } = verify(token, JWT_SECRET) as { userId: string };
    return userId;
  } catch (err) {
    console.error('Error when verify JWT', err);
    return null;
  }
};

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  const userId = verifyJWT(token);
  if (!userId) return next('Unauthorized');
  return next();
};

export const getUserIdFromJWT = (token: string) => {
  return verifyJWT(token);
};
