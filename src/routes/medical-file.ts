import * as express from 'express';
import getMedicalFileService from '../domain/services/medical-file';
import { Repository } from '../domain/ports';
import { getUserIdFromJWT, isAuthenticated } from '../infra/jwt';

export default (repository: Repository) => {
  const { findAll, create, get } = getMedicalFileService(repository);

  const apiRoutes = express.Router();

  apiRoutes.use(isAuthenticated);

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(files => res.status(200).json({ success: true, files }))
      .catch(next);
  });

  apiRoutes.post('/', (req, res, next) => {
    const { parity, gravidity, patientId } = req.body;
    if (!parity || !gravidity || !patientId) return res.status(400).json({ reason: 'Missing parameter' });
    const userId = getUserIdFromJWT(req.headers.authorization);
    if (!userId) return res.status(400).json({ reason: 'Invalid token provided. User not found.' });
    return create({ parity, patientId, professionalId: userId, gravidity })
      .then(file => res.status(201).json({ file }))
      .catch(next);
  });

  apiRoutes.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ reason: 'Missing id' });
    return get(id)
      .then(file => res.status(200).json({ file }))
      .catch(next);
  });

  return apiRoutes;
};
