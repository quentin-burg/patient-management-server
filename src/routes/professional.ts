import * as express from 'express';
import { ProfessionalPort } from '../domain/ports/professional';
import { isAuthenticated, makeJWT } from '../infra/jwt';
import { hashPassword } from '../infra/password-hash';

export default ({ findAll, register }: ProfessionalPort) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    return findAll().then(pro => res.status(200).json(pro));
  });

  apiRoutes.post('/register', (req, res, next) => {
    const { firstname, lastname, rpps, email, password } = req.body;
    if (!firstname || !lastname || !rpps || !email || !password) return res.status(400).json({ success: false });
    return hashPassword(password).then(hash =>
      register({ firstname, lastname, rpps, email, hash })
        .then(pro => ({ token: makeJWT(pro.id), pro }))
        .then(({ pro, token }) => res.status(201).json({ professional: pro, token }))
        .catch(err => {
          console.error(err);
          return next();
        }),
    );
  });

  apiRoutes.use(isAuthenticated);

  return apiRoutes;
};
