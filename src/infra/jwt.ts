import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = 'pregnancyWheel';

export const makeJWT = (userId: string, isPatient: boolean, isProfessional: boolean) => {
  return sign({ userId, isPatient, isProfessional }, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyJWT = (token: string | undefined) => {
  if (!token) {
    console.error('Token not provided. Cannot verify');
    return null;
  }
  try {
    const { userId, isProfessional, isPatient } = verify(token, JWT_SECRET) as {
      userId: string;
      isPatient: boolean;
      isProfessional: boolean;
    };
    return { userId, isProfessional, isPatient };
  } catch (err) {
    console.error('Error when verify JWT', err);
    return null;
  }
};

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  const userId = verifyJWT(token)?.userId;
  if (!userId) return next('Unauthorized');
  return next();
};

export const getUserIdFromJWT = (token: string | undefined) => {
  return verifyJWT(token)?.userId;
};
