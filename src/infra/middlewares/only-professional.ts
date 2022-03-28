import { Request } from 'express';
import { getUserIdFromJWT } from '../jwt';

export const onlyProfessional = (isProfessionalService: (id: string) => Promise<boolean>) => (req, res, next) => {
  const userId = getUserIdFromJWT(req.headers.authorization);
  if (!userId) return res.status(400).json({ reason: 'Invalid token provided. User not found.' });
  req.userId = userId;
  return isProfessionalService(userId)
    .then(isPro => {
      if (isPro) return next();
      return res.status(403).json({ reason: 'You are not a professional.' });
    })
    .catch(err => {
      console.error(err);
      return next();
    });
};

export interface RequestWithUserId extends Request {
  userId?: string;
}
