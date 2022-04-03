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
  isProfessional: boolean;
  isPatient: boolean;
}

interface UserCreationAttributes extends Optional<UserAttr, 'id'> {}

export interface UserInstance extends Model<UserAttr, UserCreationAttributes>, UserAttr {
  addPatientFile: BelongsToSetAssociationMixin<MedicalFileInstance, MedicalFile>;
  addProfessionalFile: BelongsToSetAssociationMixin<MedicalFileInstance, MedicalFile>;
}

export const toEntity = (u: UserInstance): UserEntity => ({
  id: u.id,
  email: u.email,
  lastname: u.lastname,
  firstname: u.firstname,
  hash: u.hash,
  isPatient: u.isPatient,
  isProfessional: u.isProfessional,
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
    isProfessional: DataTypes.BOOLEAN,
    isPatient: DataTypes.BOOLEAN,
  });

  const UserAdapter: UserPort = {
    findAll: () => User.findAll().then(users => users.map(toEntity)),
    create: (args: UserRegisterParams) => User.create(args),
    findOneByEmail: (email: string) =>
      User.findOne({ where: { email } }).then(u => (u ? toEntity(u) : Promise.reject('User not found.'))),
    findOneById: (id: string) =>
      User.findOne({ where: { id } }).then(u => (u ? toEntity(u) : Promise.reject('User not found.'))),
  };
  return { User, UserAdapter };
};
