import { Professional } from './domain/entities/identity/professional';

export type RegisterParams = Pick<Professional, 'email' | 'firstname' | 'lastname' | 'rpps'>;
