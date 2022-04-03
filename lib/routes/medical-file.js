"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const medical_file_1 = require("../domain/services/medical-file");
const user_1 = require("../domain/services/user");
const jwt_1 = require("../infra/jwt");
const only_professional_1 = require("../infra/middlewares/only-professional");
exports.default = (repository) => {
    const { findAll, create, get } = (0, medical_file_1.default)(repository);
    const { isProfessional, getByEmail } = (0, user_1.default)(repository);
    const apiRoutes = express.Router();
    apiRoutes.use(jwt_1.isAuthenticated);
    apiRoutes.get('/', (req, res, next) => {
        const userInfos = (0, jwt_1.verifyJWT)(req.headers.authorization);
        if (userInfos) {
            return findAll()
                .then(files => files.filter(f => userInfos.isPatient ? f.patientId === userInfos.userId : f.professionalId === userInfos.userId))
                .then(files => res.status(200).json({ files }))
                .catch(next);
        }
        return res.status(400).json({ reason: 'Missing requester.' });
    });
    apiRoutes.post('/', (0, only_professional_1.onlyProfessional)(isProfessional), (req, res, next) => {
        const { parity, gravidity, patientEmail } = req.body;
        if (parity < 0 || gravidity < 0 || !patientEmail)
            return res.status(400).json({ reason: 'Missing parameter' });
        if (req.userId) {
            const professionalId = req.userId;
            return getByEmail(patientEmail)
                .then(user => {
                if (!user.isPatient)
                    return res.status(400).json({ reason: 'Email provided is not a patient.' });
                return create({ parity, patientId: user.id, professionalId, gravidity }).then(file => res.status(201).json({ file }));
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
        if (!id)
            return res.status(400).json({ reason: 'Missing id' });
        return get(id)
            .then(file => res.status(200).json({ file }))
            .catch(next);
    });
    return apiRoutes;
};
