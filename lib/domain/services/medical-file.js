"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ medicalFile }) => ({
    findAll: () => medicalFile.findAll(),
    create: (args) => medicalFile.create(args),
    get: (id) => medicalFile.findOneById(id),
});
