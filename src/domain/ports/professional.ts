import { RegisterParams } from '../../shared.types';
import { Professional } from '../entities/identity/professional';

export interface ProfessionalPort {
  findAll(): Promise<Professional[]>;
  register(args: RegisterParams): Promise<Omit<Professional, 'hash'>>;
}
