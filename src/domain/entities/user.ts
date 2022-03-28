export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  hash: string;
  isProfessional: boolean;
  isPatient: boolean;
};

export const equalsUserInfos = (u1: User, u2: User) => {
  return (
    u1.firstname === u2.firstname &&
    u1.email === u2.email &&
    u1.lastname === u2.lastname &&
    u1.hash === u2.hash &&
    u1.isPatient === u2.isPatient &&
    u1.isProfessional === u2.isProfessional
  );
};
