import { MedicalFileCreateParams } from '../../shared.types';
import { MedicalFile } from '../../domain/entities/medical-file';
import { MedicalFilePort } from '../../domain/ports/medical-file';

const files: Record<string, MedicalFile> = {};

const create = ({ parity, patientId, professionalId, gravidity }: MedicalFileCreateParams) => {
  const id = Math.random + '';
  const file: MedicalFile = {
    id,
    parity,
    patientId,
    professionalId,
    gravidity,
    consultations: [],
  };
  files[id] = file;
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
