import { Sequelize } from 'sequelize';
import { Repository } from '../../domain/ports';
import initUserModel from './models/user';
import initMedicalFilesModel from './models/medical-files';
import initConsultationModel from './models/consultation';

export const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/wheel');

const { UserAdapter, User } = initUserModel(sequelize);
const { MedicalFiles, MedicalFilesAdapter } = initMedicalFilesModel(sequelize);
const { Consultation, ConsultationAdapter } = initConsultationModel(sequelize);

export const repository: Repository = {
  user: UserAdapter,
  medicalFiles: MedicalFilesAdapter,
  consultation: ConsultationAdapter,
};

// Sequelize associations
// Professional.hasMany(Patient, { foreignKey: 'professionalId' });

// User.belongsToMany(User, { through: 'MedicalFiles', as: 'Patient' });

// MedicalFiles.hasMany(Consultations)
// Consultation.belongsTo(MedicalFiles)

User.hasMany(MedicalFiles, { foreignKey: 'patientId' });
// MedicalFiles.belongsTo(User);
User.hasMany(MedicalFiles, { foreignKey: 'professionalId' });
MedicalFiles.hasMany(Consultation, { foreignKey: 'medicalFileId' });
// Consultation.belongsTo(MedicalFiles);
