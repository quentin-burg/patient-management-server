import * as express from 'express';
import PUC from '../domain/usecases/professional';
import { ProfessionalPort } from '../domain/ports/professional';

// TODO : adapter must be injected from index.ts instead of import

// apiRoutes.post('/', (req, res) => {
//   PUC.
// })

export default (professionalRepo: ProfessionalPort) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    return professionalRepo.findAll().then(pro => res.status(200).send(pro));
  });

  return apiRoutes;
};
