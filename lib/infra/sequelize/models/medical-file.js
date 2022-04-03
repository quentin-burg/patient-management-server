"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const consultation_1 = require("./consultation");
const user_1 = require("./user");
const toEntity = (m) => ({
    id: m.id,
    parity: m.parity,
    gravidity: m.gravidity,
    patientId: m.patientId,
    professionalId: m.professionalId,
    consultations: m.consultations ? m.consultations.map(c => (0, consultation_1.toEntity)(c)) : [],
});
const toEntityWithUsers = (m) => {
    return {
        ...toEntity(m),
        patient: (0, user_1.toEntity)(m.patient),
        professional: (0, user_1.toEntity)(m.professional),
    };
};
exports.default = (sequelize) => (User) => {
    const MedicalFile = sequelize.define('MedicalFile', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
        },
        parity: sequelize_1.DataTypes.INTEGER,
        gravidity: sequelize_1.DataTypes.INTEGER,
    });
    const MedicalFileAdapter = {
        findAll: () => MedicalFile.findAll({
            include: [
                {
                    model: User,
                    as: 'patient',
                },
                {
                    model: User,
                    as: 'professional',
                },
            ],
        }).then(mfs => mfs.map(toEntityWithUsers)),
        create: ({ gravidity, parity, patientId, professionalId }) => User.findOne({ where: { id: patientId } })
            .then(patient => Promise.all([patient, User.findOne({ where: { id: professionalId } })]))
            .then(([patient, professional]) => sequelize
            .transaction(transaction => MedicalFile.create({ gravidity, parity }, { transaction }).then(file => {
            return Promise.all([
                file,
                patient?.addPatientFile(file, { transaction }),
                professional?.addProfessionalFile(file, { transaction }),
            ]);
        }))
            .then(([file]) => {
            return MedicalFile.findOne({
                where: { id: file.id },
                include: [
                    {
                        model: User,
                        as: 'patient',
                    },
                    {
                        model: User,
                        as: 'professional',
                    },
                ],
            });
        }))
            .then(mf => (mf ? toEntityWithUsers(mf) : Promise.reject('Error when creating medical file.'))),
        findOneById: (id) => MedicalFile.findOne({ where: { id }, include: 'consultations' }).then(mf => mf ? toEntity(mf) : Promise.reject('Medical file not found.')),
    };
    return { MedicalFile, MedicalFileAdapter };
};
