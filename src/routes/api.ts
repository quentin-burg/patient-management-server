import * as express from 'express';
import { Repository } from 'src/domain/ports';

import professionalRoutes from './professional';

export default (repository: Repository) => {
  const apiRoutes = express.Router();

  apiRoutes.use('/professional', professionalRoutes(repository.professional));
  return apiRoutes;
};
