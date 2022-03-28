export type UserLoginParams = {
  email: string;
  password: string;
};

export type UserRegisterParams = {
  email: string;
  firstname: string;
  lastname: string;
  hash: string;
  isPatient: boolean;
  isProfessional: boolean;
};

export type MedicalFileCreateParams = {
  patientId: string;
  professionalId: string;
  gravidity: number;
  parity: number;
};

export type ConsultationCreateParams = {
  term: string;
  report?: string;
  images?: string[];
  medicalFileId: string;
};

export type ConsultationUpdateParams = {
  report?: string;
  images?: string[];
  consultationId: string;
};
