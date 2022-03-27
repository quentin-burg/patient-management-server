import * as express from 'express';
import { isAuthenticated, makeJWT } from '../infra/jwt';
import { hashPassword } from '../infra/password-hash';
import getUserService from '../domain/services/user';
import { Repository } from '../domain/ports';

export default (repository: Repository) => {
  const { register, findAll, login } = getUserService(repository);

  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(users => res.status(200).json({ users }))
      .catch(next);
  });

  apiRoutes.post('/register', (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) return res.status(400).json({ reason: 'Missing parameter' });
    return hashPassword(password).then(hash =>
      register({ firstname, lastname, email, hash })
        .then(user => ({ token: makeJWT(user.id), user }))
        .then(({ user, token }) => res.status(201).json({ user: user, token }))
        .catch(err => {
          console.error(err);
          return next();
        }),
    );
  });

  apiRoutes.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ reason: 'Missing parameter' });
    return login(email, password)
      .then(user => ({ token: makeJWT(user.id), user }))
      .then(({ user, token }) => res.status(200).json({ user, token }))
      .catch(next);
  });

  apiRoutes.use(isAuthenticated);

  return apiRoutes;
};