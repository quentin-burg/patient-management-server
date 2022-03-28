import { UserRegisterParams } from '../../shared.types';
import { User } from '../../domain/entities/user';
import { UserPort } from '../../domain/ports/user';

type Users = Record<string, User>;

const users: Users = {};

const createUser = ({ email, isPatient, isProfessional, hash, lastname, firstname }: UserRegisterParams) => {
  const id = Math.random + '';
  const user: User = {
    email,
    isPatient,
    isProfessional,
    hash,
    firstname,
    lastname,
    id,
  };
  users[id] = user;
  return Promise.resolve(user);
};

const findOneByEmail = (email: string) => {
  const user = Object.values(users).find(u => u.email === email);
  return user ? Promise.resolve(user) : Promise.reject('Cannot find user');
};

const findOneById = id => {
  const user = users[id];
  return user ? Promise.resolve(user) : Promise.reject('Cannot find user');
};

export const UserAdapter: UserPort = {
  findAll: () => Promise.resolve(Object.values(users)),
  create: createUser,
  findOneByEmail,
  findOneById,
};
