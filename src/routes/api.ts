import * as express from 'express';
import { Repository } from 'src/domain/ports';

import professionalRoutes from './professional';
import patientRoutes from './patient';

export default (repository: Repository) => {
  const apiRoutes = express.Router();

  apiRoutes
    .use('/professional', professionalRoutes(repository.professional))
    .use('/patient', patientRoutes(repository.patient));
  return apiRoutes;
};
