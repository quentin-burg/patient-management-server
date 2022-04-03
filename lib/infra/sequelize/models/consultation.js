"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntity = void 0;
const sequelize_1 = require("sequelize");
const term_1 = require("../../../domain/entities/term");
const toEntity = (c) => ({
    id: c.id,
    report: c.report || '',
    term: (0, term_1.toTerm)(c.term),
    images: c.images || [],
    medicalFileId: c.medicalFileId,
});
exports.toEntity = toEntity;
exports.default = (sequelize) => (MedicalFile) => {
    const Consultation = sequelize.define('Consultation', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
        },
        report: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
        images: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        term: sequelize_1.DataTypes.STRING,
    });
    const ConsultationAdapter = {
        findAll: () => Consultation.findAll().then(c => c.map(exports.toEntity)),
        findOneById: (id) => Consultation.findOne({ where: { id } }).then(c => (c ? (0, exports.toEntity)(c) : Promise.reject('Consultation not found'))),
        create: ({ report, term, images, medicalFileId }) => MedicalFile.findOne({ where: { id: medicalFileId } })
            .then(file => {
            if (!file)
                return Promise.reject('Medical file not found');
            return sequelize.transaction(transaction => Consultation.create({ report, term, images }).then(consult => Promise.all([consult, file.addConsultation(consult, { transaction })])));
        })
            .then(([c]) => Consultation.findOne({ where: { id: c.id } }))
            .then(c => (c ? (0, exports.toEntity)(c) : Promise.reject('Error when creating consultation.'))),
        update: ({ report, images, consultationId }) => Consultation.update({ report, images }, {
            returning: true,
            where: {
                id: consultationId,
            },
        }).then(([nbRows, rows]) => {
            if (nbRows > 0) {
                return (0, exports.toEntity)(rows[0]);
            }
            return Promise.reject('No consultation updated.');
        }),
        findAllByMedicalFileId: (fileId) => Consultation.findAll({ where: { medicalFileId: fileId } }).then(cs => cs.map(exports.toEntity)),
    };
    return { Consultation, ConsultationAdapter };
};
