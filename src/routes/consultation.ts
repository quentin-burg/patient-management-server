import * as express from 'express';
import getConsultationService from '../domain/services/consultation';
import getUserService from '../domain/services/user';
import { Repository } from '../domain/ports';
import { getUserIdFromJWT, isAuthenticated } from '../infra/jwt';
import { onlyProfessional } from '../infra/middlewares/only-professional';

export default (repository: Repository) => {
  const { findAll, create, update } = getConsultationService(repository);
  const { isProfessional } = getUserService(repository);

  const apiRoutes = express.Router();

  apiRoutes.use(isAuthenticated);

  apiRoutes.get('/', (req, res, next) => {
    return findAll()
      .then(cs => res.status(200).json({ success: true, cs }))
      .catch(next);
  });

  apiRoutes.post('/', onlyProfessional(isProfessional), (req, res, next) => {
    const { report, images, term, medicalFileId } = req.body;
    if (!term || !medicalFileId) return res.status(400).json({ reason: 'Missing parameter term or medicalFileId' });
    return create({ term, images, report, medicalFileId })
      .then(file => res.status(201).json({ file }))
      .catch(next);
  });

  apiRoutes.put('/:consultationId', onlyProfessional(isProfessional), (req, res, next) => {
    const { consultationId } = req.params;
    const { images, report } = req.body;
    if (!consultationId) return res.status(400).json({ reason: 'Missing parameter consultationId' });
    return update({ images, report, consultationId })
      .then(consultation => res.status(200).json({ consultation }))
      .catch(next);
  });

  return apiRoutes;
};
