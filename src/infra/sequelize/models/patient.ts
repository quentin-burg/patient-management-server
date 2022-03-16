import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { PatientPort } from '../../../domain/ports/patient';
import { Patient as PatientEntity } from '../../../domain/entities/identity/patient';
import { PatientRegisterParams } from '../../../shared.types';

interface PatientAttr {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  hash: string;
}

interface PatientCreationAttributes extends Optional<PatientAttr, 'id'> {}

interface PatientInstance extends Model<PatientAttr, PatientCreationAttributes>, PatientAttr {}

const toEntity = (p: PatientInstance): PatientEntity => ({
  id: p.id,
  email: p.email,
  lastname: p.lastname,
  firstname: p.firstname,
  birthdate: p.birthdate,
});

export default (sequelize: Sequelize) => {
  const Patient = sequelize.define<PatientInstance>('Patient', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
  });

  const PatientAdapter: PatientPort = {
    findAll: () => Patient.findAll().then(patients => patients.map(toEntity)),
    register: (args: PatientRegisterParams) => Patient.create(args),
  };
  return { Patient, PatientAdapter };
};
