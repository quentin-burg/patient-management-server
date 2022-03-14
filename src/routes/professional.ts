import * as express from 'express';
import professionalUseCases from '../domain/usecases/professional';
import { ProfessionalPort } from '../domain/ports/professional';

export default (professionalRepo: ProfessionalPort) => {
  const apiRoutes = express.Router();

  const usecases = professionalUseCases(professionalRepo);

  apiRoutes.get('/', (req, res) => {
    return usecases.findAllProfessionals().then(pro => res.status(200).json(pro));
  });

  apiRoutes.post('/register', (req, res, next) => {
    const { firstname, lastname, rpps, email } = req.body;
    if (!firstname || !lastname || !rpps || !email) return res.status(400).json({ success: false });
    return usecases
      .register({ firstname, lastname, rpps, email })
      .then(professional => res.status(201).json({ professional }))
      .catch(err => {
        console.error(err);
        return next();
      });
  });

  return apiRoutes;
};
