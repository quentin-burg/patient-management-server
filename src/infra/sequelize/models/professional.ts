// import { BelongsToSetAssociationMixin, DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
// import { Professional as ProfessionalEntity } from 'src/domain/entities/identity/professional';
// import { ProfessionalPort } from '../../../domain/ports/professional';
// import { Patient } from '../../../domain/entities/identity/patient';
// import { PatientInstance } from './patient';
// import { PatientPort } from '../../../domain/ports/patient';
// interface ProfessionalAttr {
//   id: string;
//   firstname: string;
//   lastname: string;
//   hash: string;
//   rpps: string;
//   email: string;
// }

// interface ProfessionalCreationAttributes extends Optional<ProfessionalAttr, 'id'> {}

// const toEntity = (p: ProfessionalInstance): ProfessionalEntity => ({
//   email: p.email,
//   lastname: p.lastname,
//   firstname: p.firstname,
//   rpps: p.rpps,
//   id: p.id,
//   hash: p.hash,
// });

// export interface ProfessionalInstance
//   extends Model<ProfessionalAttr, ProfessionalCreationAttributes>,
//     ProfessionalAttr {
//   addPatient: BelongsToSetAssociationMixin<PatientInstance, Patient>;
// }

// export default (sequelize: Sequelize) => (Patient: ModelStatic<PatientInstance>) => {
//   const Professional = sequelize.define<ProfessionalInstance>('Professional', {
//     id: {
//       primaryKey: true,
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV1,
//       allowNull: false,
//     },
//     firstname: { type: DataTypes.STRING, allowNull: false },
//     lastname: { type: DataTypes.STRING, allowNull: false },
//     hash: { type: DataTypes.STRING, allowNull: false },
//     rpps: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false },
//   });

//   const ProfessionnalAdapter: ProfessionalPort = {
//     findAll: () => Professional.findAll().then(pro => pro.map(toEntity)),
//     create: args => Professional.create(args).then(toEntity),
//     findOneByEmail: email =>
//       Professional.findOne({ where: { email } }).then(p =>
//         p ? toEntity(p) : Promise.reject('Professional not found.'),
//       ),
//     addPatient: (patientId, proId) =>
//       Professional.findOne({ where: { id: proId } })
//         .then(professional => professional || Promise.reject('Professional not found.'))
//         .then(professional =>
//           Patient.findOne({ where: { id: patientId } }).then(patient => {
//             if (professional && patient) return professional.addPatient(patient);
//             return Promise.reject('Professional or patient not found.');
//           }),
//         ),
//   };

//   return { Professional, ProfessionnalAdapter };
// };
export {};
