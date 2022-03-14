import { DataTypes, Model, Optional } from 'sequelize';
import { PatientPort } from '../../../domain/ports/patient';
// import { sequelize } from '../../../';
import { Patient as PatientEntity } from '../../../domain/entities/identity/patient';

interface PatientAttr {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
}

// console.log('sequzlizezerzeafazf', sequelize);

interface PatientCreationAttributes extends Optional<PatientAttr, 'id'> {}

interface PatientInstance extends Model<PatientAttr, PatientCreationAttributes>, PatientAttr {}

// export const Patient = sequelize.define<PatientInstance>('Patient', {
//   id: {
//     primaryKey: true,
//     type: DataTypes.UUID,
//   },
//   firstname: DataTypes.STRING,
//   lastname: DataTypes.STRING,
//   birthdate: DataTypes.DATE,
//   email: DataTypes.STRING,
// });

// const toEntity = (p: PatientInstance): PatientEntity => ({
//   email: p.email,
//   lastname: p.lastname,
//   firstname: p.firstname,
//   birthdate: p.birthdate,
// });

// export const PatientAdapter: PatientPort = {
//   findAll: () => Patient.findAll().then(patients => patients.map(toEntity)),
// };
