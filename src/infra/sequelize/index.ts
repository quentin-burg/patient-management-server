import { Sequelize } from 'sequelize';
import { Repository } from '../../domain/ports';
import initProfessionalModel from './models/professional';

export const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/wheel');

const { ProfessionnalAdapter } = initProfessionalModel(sequelize);

export const repository: Repository = {
  professional: ProfessionnalAdapter,
};
