import { Sequelize } from 'sequelize';
import { Repository } from '../../domain/ports';
import initProfessionalModel from './models/professional';
import initPatientModel from './models/patient';

export const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/wheel');

const { PatientAdapter, Patient } = initPatientModel(sequelize);
const { ProfessionnalAdapter, Professional } = initProfessionalModel(sequelize)(Patient);

export const repository: Repository = {
  professional: ProfessionnalAdapter,
  patient: PatientAdapter,
};

// Sequelize associations
Professional.hasMany(Patient, { foreignKey: 'professionalId' });
