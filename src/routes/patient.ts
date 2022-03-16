import * as express from 'express';
import { PatientPort } from '../domain/ports/patient';
import { isAuthenticated, makeJWT } from '../infra/jwt';
import { hashPassword } from '../infra/password-hash';

export default ({ findAll, register }: PatientPort) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    return findAll().then(patients => res.status(200).json(patients));
  });

  apiRoutes.post('/register', (req, res, next) => {
    const { firstname, lastname, email, password, birthdate } = req.body;
    if (!firstname || !lastname || !birthdate || !email || !password)
      return res.status(400).json({ success: false, reason: 'Missing parameter' });
    return hashPassword(password).then(hash =>
      register({ firstname, lastname, birthdate, email, hash })
        .then(patient => ({ token: makeJWT(patient.id), patient }))
        .then(({ patient, token }) => res.status(201).json({ patient: patient, token }))
        .catch(err => {
          console.error(err);
          return next();
        }),
    );
  });

  apiRoutes.use(isAuthenticated);

  return apiRoutes;
};
