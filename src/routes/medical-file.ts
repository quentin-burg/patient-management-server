import * as express from 'express';
import getMedicalFileService from '../domain/services/medical-file';
import getUserService from '../domain/services/user';
import { Repository } from '../domain/ports';
import { isAuthenticated, verifyJWT } from '../infra/jwt';
import { onlyProfessional, RequestWithUserId } from '../infra/middlewares/only-professional';

export default (repository: Repository) => {
  const { findAll, create, get } = getMedicalFileService(repository);
  const { isProfessional, getByEmail } = getUserService(repository);

  const apiRoutes = express.Router();

  apiRoutes.use(isAuthenticated);

  apiRoutes.get('/', (req, res, next) => {
    const userInfos = verifyJWT(req.headers.authorization);
    if (userInfos) {
      return findAll()
        .then(files =>
          files.filter(f =>
            userInfos.isPatient ? f.patientId === userInfos.userId : f.professionalId === userInfos.userId,
          ),
        )
        .then(files => res.status(200).json({ files }))
        .catch(next);
    }
    return res.status(400).json({ reason: 'Missing requester.' });
  });

  apiRoutes.post('/', onlyProfessional(isProfessional), (req: RequestWithUserId, res, next) => {
    const { parity, gravidity, patientEmail } = req.body;
    if (parity < 0 || gravidity < 0 || !patientEmail) return res.status(400).json({ reason: 'Missing parameter' });
    if (req.userId) {
      const professionalId = req.userId;
      return getByEmail(patientEmail)
        .then(user => {
          if (!user.isPatient) return res.status(400).json({ reason: 'Email provided is not a patient.' });
          return create({ parity, patientId: user.id, professionalId, gravidity }).then(file =>
            res.status(201).json({ file }),
          );
        })
        .catch(err => {
          console.error(err);
          return next;
        });
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
