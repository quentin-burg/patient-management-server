import * as express from 'express';
import { isAuthenticated, makeJWT } from '../infra/jwt';
import { hashPassword } from '../infra/password-hash';
import getPatientService from '../domain/services/patient';
import { Repository } from '../domain/ports';

export default (repository: Repository) => {
  const { register, findAll, login } = getPatientService(repository);

  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(patients => res.status(200).json({ success: true, patients }))
      .catch(next);
  });

  apiRoutes.post('/register', (req, res, next) => {
    const { firstname, lastname, email, password, birthdate } = req.body;
    if (!firstname || !lastname || !birthdate || !email || !password)
      return res.status(400).json({ success: false, reason: 'Missing parameter' });
    return hashPassword(password).then(hash =>
      register({ firstname, lastname, birthdate, email, hash })
        .then(patient => ({ token: makeJWT(patient.id), patient }))
        .then(({ patient, token }) => res.status(201).json({ success: true, patient: patient, token }))
        .catch(err => {
          console.error(err);
          return next();
        }),
    );
  });

  apiRoutes.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, reason: 'Missing parameter' });
    return login(email, password)
      .then(patient => ({ token: makeJWT(patient.id), patient }))
      .then(({ patient, token }) => res.status(200).json({ success: true, patient, token }))
      .catch(next);
  });

  apiRoutes.use(isAuthenticated);

  return apiRoutes;
};
