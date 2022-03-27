import { Sequelize } from 'sequelize';
import { Repository } from '../../domain/ports';
import initUserModel from './models/user';
import initMedicalFilesModel from './models/medical-file';
import initConsultationModel from './models/consultation';

export const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/wheel');

const { UserAdapter, User } = initUserModel(sequelize);
const { MedicalFile, MedicalFileAdapter } = initMedicalFilesModel(sequelize)(User);
const { Consultation, ConsultationAdapter } = initConsultationModel(sequelize)(MedicalFile);

export const repository: Repository = {
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
// MedicalFiles.belongsTo(User);
User.hasMany(MedicalFile, { foreignKey: 'professionalId', as: 'professionalFile' });
MedicalFile.hasMany(Consultation, { foreignKey: 'medicalFileId', as: 'consultations' });
// Consultation.belongsTo(MedicalFiles);
