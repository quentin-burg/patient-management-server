export type ProfessionalRegisterParams = {
  email: string;
  firstname: string;
  lastname: string;
  rpps: string;
  hash: string;
};

export type ProfessionalLoginParams = {
  email: string;
  password: string;
};

export type PatientRegisterParams = {
  email: string;
  firstname: string;
  lastname: string;
  hash: string;
  birthdate: string;
};
