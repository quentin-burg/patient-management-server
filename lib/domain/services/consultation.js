"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ consultation }) => ({
    findAll: () => consultation.findAll(),
    create: (args) => consultation.create(args),
    update: (args) => consultation.update(args),
    findAllByMedicalFileId: (fileId) => consultation.findAllByMedicalFileId(fileId),
});
