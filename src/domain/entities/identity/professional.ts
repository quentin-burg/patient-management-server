// import { MedicalFile } from '../consultation/medical-file';

export type Professional = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  rpps: string;
  // medicalFiles: MedicalFile[];
  // groupId: string
};

export const buildProfesionnal = (
  firstname: string,
  lastname: string,
  email: string,
  rpps: string,
  id: string,
  // medicalFiles: MedicalFile[],
): Professional => ({
  id,
  firstname,
  lastname,
  email,
  rpps,
  // medicalFiles,
});
