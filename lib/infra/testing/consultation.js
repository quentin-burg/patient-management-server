"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationAdapter = void 0;
const term_1 = require("../../domain/entities/term");
const consultations = {};
const create = ({ term, medicalFileId, report, images }) => {
    const id = Math.random + '';
    const consultation = {
        id,
        report: report || '',
        term: (0, term_1.toTerm)(term),
        images: images || [],
        medicalFileId,
    };
    consultations[id] = consultation;
    return Promise.resolve(consultation);
};
const update = ({ report, images, consultationId }) => {
    if (images && images.length)
        consultations[consultationId].images = images;
    if (report)
        consultations[consultationId].report = report;
    return Promise.resolve(consultations[consultationId]);
};
exports.ConsultationAdapter = {
    findAll: () => Promise.resolve(Object.values(consultations)),
    findAllByMedicalFileId: (id) => Promise.resolve(Object.values(consultations).filter(c => c.medicalFileId === id)),
    findOneById: (id) => {
        const consultation = consultations[id];
        return consultation ? Promise.resolve(consultation) : Promise.reject();
    },
    create,
    update,
};
