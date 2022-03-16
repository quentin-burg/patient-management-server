import { compare, hash } from 'bcrypt';

const saltRound = 10;
export const hashPassword = (password: string) => hash(password, saltRound);

export const comparePassword = (password: string, hash: string) => compare(password, hash);
