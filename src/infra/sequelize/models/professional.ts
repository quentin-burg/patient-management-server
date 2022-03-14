import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Professional as ProfessionalEntity } from 'src/domain/entities/identity/professional';
import { ProfessionalPort } from '../../../domain/ports/professional';
// import { Patient } from './patient';

interface ProfessionalAttr {
  id: string;
  firstname: string;
  lastname: string;
  rpps: string;
  email: string;
}

interface ProfessionalCreationAttributes extends Optional<ProfessionalAttr, 'id'> {}

interface ProfessionalInstance extends Model<ProfessionalAttr, ProfessionalCreationAttributes>, ProfessionalAttr {}

const toEntity = (p: ProfessionalInstance): ProfessionalEntity => ({
  email: p.email,
  lastname: p.lastname,
  firstname: p.firstname,
  rpps: p.rpps,
  id: p.id,
});

export default (sequelize: Sequelize) => {
  const Professional = sequelize.define<ProfessionalInstance>('Professional', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    rpps: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  // Professional.hasMany(Patient, { foreignKey: 'professionalId' });

  const ProfessionnalAdapter: ProfessionalPort = {
    findAll: () => Professional.findAll().then(pro => pro.map(toEntity)),
    // create: () => Professional.create()
  };

  return { Professional, ProfessionnalAdapter };
};
