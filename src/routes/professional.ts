import * as express from 'express';
import professionalUseCases from '../domain/usecases/professional';
import { ProfessionalPort } from '../domain/ports/professional';

export default (professionalRepo: ProfessionalPort) => {
  const apiRoutes = express.Router();

  const usecases = professionalUseCases(professionalRepo);

  apiRoutes.get('/', (req, res) => {
    return usecases.findAllProfessionals().then(pro => res.send(pro));
  });

  return apiRoutes;
};
