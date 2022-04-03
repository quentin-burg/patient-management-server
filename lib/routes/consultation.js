"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const consultation_1 = require("../domain/services/consultation");
const user_1 = require("../domain/services/user");
const jwt_1 = require("../infra/jwt");
const only_professional_1 = require("../infra/middlewares/only-professional");
exports.default = (repository) => {
    const { findAll, create, update, findAllByMedicalFileId } = (0, consultation_1.default)(repository);
    const { isProfessional } = (0, user_1.default)(repository);
    const apiRoutes = express.Router();
    apiRoutes.use(jwt_1.isAuthenticated);
    apiRoutes.get('/', (req, res, next) => {
        return findAll()
            .then(cs => res.status(200).json({ success: true, cs }))
            .catch(next);
    });
    apiRoutes.get('/:fileId', (req, res, next) => {
        const { fileId } = req.params;
        return findAllByMedicalFileId(fileId)
            .then(consultations => res.status(200).json({ success: true, consultations }))
            .catch(next);
    });
    apiRoutes.post('/', (0, only_professional_1.onlyProfessional)(isProfessional), (req, res, next) => {
        const { report, images, term, medicalFileId } = req.body;
        if (!term || !medicalFileId)
            return res.status(400).json({ reason: 'Missing parameter term or medicalFileId' });
        return create({ term, images, report, medicalFileId })
            .then(consultation => res.status(201).json({ consultation }))
            .catch(next);
    });
    apiRoutes.put('/:consultationId', (0, only_professional_1.onlyProfessional)(isProfessional), (req, res, next) => {
        const { consultationId } = req.params;
        const { images, report } = req.body;
        if (!consultationId)
            return res.status(400).json({ reason: 'Missing parameter consultationId' });
        return update({ images, report, consultationId })
            .then(consultation => res.status(200).json({ consultation }))
            .catch(next);
    });
    return apiRoutes;
};
