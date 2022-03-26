import * as express from 'express';
import { Repository } from 'src/domain/ports';

import userRoutes from './user';

export default (repository: Repository) => {
  const apiRoutes = express.Router();

  apiRoutes.use('/user', userRoutes(repository));
  return apiRoutes;
};
