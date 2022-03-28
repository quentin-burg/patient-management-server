import * as express from 'express';
import getMedicalFileService from '../domain/services/medical-file';
import getUserService from '../domain/services/user';
import { Repository } from '../domain/ports';
import { getUserIdFromJWT, isAuthenticated } from '../infra/jwt';
import { onlyProfessional, RequestWithUserId } from '../infra/middlewares/only-professional';

export default (repository: Repository) => {
  const { findAll, create, get } = getMedicalFileService(repository);
  const { isProfessional } = getUserService(repository);

  const apiRoutes = express.Router();

  apiRoutes.use(isAuthenticated);

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(files => res.status(200).json({ success: true, files }))
      .catch(next);
  });

  apiRoutes.post('/', onlyProfessional(isProfessional), (req: RequestWithUserId, res, next) => {
    const { parity, gravidity, patientId } = req.body;
    if (!parity || !gravidity || !patientId) return res.status(400).json({ reason: 'Missing parameter' });
    if (req.userId) {
      return create({ parity, patientId, professionalId: req.userId, gravidity })
        .then(file => res.status(201).json({ file }))
        .catch(next);
    }
    return res.status(400).json({ reason: 'Missing requester.' });
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
