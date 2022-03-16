import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Professional as ProfessionalEntity } from 'src/domain/entities/identity/professional';
import { ProfessionalRegisterParams } from '../../../shared.types';
import { ProfessionalPort } from '../../../domain/ports/professional';

interface ProfessionalAttr {
  id: string;
  firstname: string;
  lastname: string;
  hash: string;
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
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    rpps: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  });

  const ProfessionnalAdapter: ProfessionalPort = {
    findAll: () => Professional.findAll().then(pro => pro.map(toEntity)),
    register: (args: ProfessionalRegisterParams) => Professional.create(args).then(toEntity),
  };

  return { Professional, ProfessionnalAdapter };
};
