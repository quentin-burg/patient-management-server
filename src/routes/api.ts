import * as express from 'express';
import { Repository } from 'src/domain/ports';

import userRoutes from './user';
import medicalFileRoutes from './medical-file';
import consultationRoutes from './consultation';

export default (repository: Repository) => {
  const apiRoutes = express.Router();

  apiRoutes.use('/user', userRoutes(repository));
  apiRoutes.use('/medical-file', medicalFileRoutes(repository));
  apiRoutes.use('/consultation', consultationRoutes(repository));
  return apiRoutes;
};
