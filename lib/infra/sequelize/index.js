"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./models/user");
const medical_file_1 = require("./models/medical-file");
const consultation_1 = require("./models/consultation");
exports.sequelize = new sequelize_1.Sequelize(process.env.NODE_ENV === 'production'
    ? 'postgres://lkjxrjpn:Gg0xZbmdGQ3fo_XjvqIKg_DBh7om88ZG@manny.db.elephantsql.com/lkjxrjpn'
    : 'postgres://postgres:postgres@127.0.0.1:5432/wheel');
const { UserAdapter, User } = (0, user_1.default)(exports.sequelize);
const { MedicalFile, MedicalFileAdapter } = (0, medical_file_1.default)(exports.sequelize)(User);
const { Consultation, ConsultationAdapter } = (0, consultation_1.default)(exports.sequelize)(MedicalFile);
exports.repository = {
    user: UserAdapter,
    medicalFile: MedicalFileAdapter,
    consultation: ConsultationAdapter,
};
// Sequelize associations
// Professional.hasMany(Patient, { foreignKey: 'professionalId' });
// User.belongsToMany(User, { through: 'MedicalFiles', as: 'Patient' });
// MedicalFiles.hasMany(Consultations)
// Consultation.belongsTo(MedicalFiles)
User.hasMany(MedicalFile, { foreignKey: 'patientId', as: 'patientFile' });
MedicalFile.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
User.hasMany(MedicalFile, { foreignKey: 'professionalId', as: 'professionalFile' });
MedicalFile.belongsTo(User, { as: 'professional', foreignKey: 'professionalId' });
MedicalFile.hasMany(Consultation, { foreignKey: 'medicalFileId', as: 'consultations' });
// Consultation.belongsTo(MedicalFiles);
