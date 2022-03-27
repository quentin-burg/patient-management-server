import { BelongsToSetAssociationMixin, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserPort } from '../../../domain/ports/user';
import { User as UserEntity } from '../../../domain/entities/user';
import { UserRegisterParams } from '../../../shared.types';
import { MedicalFileInstance } from './medical-file';
import { MedicalFile } from '../../../domain/entities/medical-file';

interface UserAttr {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  hash: string;
}

interface UserCreationAttributes extends Optional<UserAttr, 'id'> {}

export interface UserInstance extends Model<UserAttr, UserCreationAttributes>, UserAttr {
  addPatientFile: BelongsToSetAssociationMixin<MedicalFileInstance, MedicalFile>;
  addProfessionalFile: BelongsToSetAssociationMixin<MedicalFileInstance, MedicalFile>;
}

const toEntity = (p: UserInstance): UserEntity => ({
  id: p.id,
  email: p.email,
  lastname: p.lastname,
  firstname: p.firstname,
  hash: p.hash,
});

export default (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
  });

  const UserAdapter: UserPort = {
    findAll: () => User.findAll().then(users => users.map(toEntity)),
    create: (args: UserRegisterParams) => User.create(args),
    findOneByEmail: (email: string) =>
      User.findOne({ where: { email } }).then(p => (p ? toEntity(p) : Promise.reject('User not found.'))),
  };
  return { User, UserAdapter };
};
