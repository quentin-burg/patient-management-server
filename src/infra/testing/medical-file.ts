import { MedicalFileCreateParams } from '../../shared.types';
import { MedicalFile } from '../../domain/entities/medical-file';
import { MedicalFilePort } from '../../domain/ports/medical-file';
import { MedicalFileWithUsers } from '../../shared.types';

const files: Record<string, MedicalFileWithUsers> = {};

const create = ({ parity, patientId, professionalId, gravidity }: MedicalFileCreateParams) => {
  const id = () => Math.random + '';
  const fileId = id();
  const file: MedicalFileWithUsers = {
    id: fileId,
    parity,
    patientId,
    professionalId,
    gravidity,
    consultations: [],
    patient: {
      id: id(),
      firstname: '',
      lastname: '',
      email: '',
      hash: '',
      isPatient: true,
      isProfessional: false,
    },
    professional: {
      id: id(),
      firstname: '',
      lastname: '',
      email: '',
      hash: '',
      isPatient: false,
      isProfessional: true,
    },
  };
  files[fileId] = file;
  return Promise.resolve(file);
};

export const MedicalFileAdapter: MedicalFilePort = {
  findAll: () => Promise.resolve(Object.values(files)),
  findOneById: (id: string) => {
    const file = files[id];
    return file ? Promise.resolve(file) : Promise.reject();
  },
  create,
};
