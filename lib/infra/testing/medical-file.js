"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalFileAdapter = void 0;
const files = {};
const create = ({ parity, patientId, professionalId, gravidity }) => {
    const id = () => Math.random + '';
    const fileId = id();
    const file = {
        id: fileId,
        parity,
        patientId,
        professionalId,
        gravidity,
        consultations: [],
        patient: {
            id: id(),
            firstname: '',
            lastname: '',
            email: '',
            hash: '',
            isPatient: true,
            isProfessional: false,
        },
        professional: {
            id: id(),
            firstname: '',
            lastname: '',
            email: '',
            hash: '',
            isPatient: false,
            isProfessional: true,
        },
    };
    files[fileId] = file;
    return Promise.resolve(file);
};
exports.MedicalFileAdapter = {
    findAll: () => Promise.resolve(Object.values(files)),
    findOneById: (id) => {
        const file = files[id];
        return file ? Promise.resolve(file) : Promise.reject();
    },
    create,
};
