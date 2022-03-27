import * as express from 'express';
import getConsultationService from '../domain/services/consultation';
import { Repository } from '../domain/ports';
import { getUserIdFromJWT, isAuthenticated } from '../infra/jwt';

export default (repository: Repository) => {
  const { findAll, create, update } = getConsultationService(repository);

  const apiRoutes = express.Router();

  apiRoutes.use(isAuthenticated);

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(cs => res.status(200).json({ success: true, cs }))
      .catch(next);
  });

  apiRoutes.post('/', (req, res, next) => {
    const { report, images, term, medicalFileId } = req.body;
    if (!term || !medicalFileId) return res.status(400).json({ reason: 'Missing parameter term or medicalFileId' });
    const userId = getUserIdFromJWT(req.headers.authorization);
    if (!userId) return res.status(400).json({ reason: 'Invalid token provided. User not found.' });
    return create({ term, images, report, medicalFileId })
      .then(file => res.status(201).json({ file }))
      .catch(next);
  });

  apiRoutes.put('/:consultationId', (req, res, next) => {
    const { consultationId } = req.params;
    const { images, report } = req.body;
    if (!consultationId) return res.status(400).json({ reason: 'Missing parameter consultationId' });
    return update({ images, report, consultationId })
      .then(consultation => res.status(200).json({ consultation }))
      .catch(next);
  });

  return apiRoutes;
};
