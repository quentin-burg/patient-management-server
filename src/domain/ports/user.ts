import { UserRegisterParams } from '../../shared.types';
import { User } from '../entities/user';

export interface UserPort {
  findAll(): Promise<User[]>;
  create(args: UserRegisterParams): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: string): Promise<User>;
}
