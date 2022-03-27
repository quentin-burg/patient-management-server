import { MedicalFileCreateParams } from '../../shared.types';
import { Repository } from '../ports';

export default ({ medicalFile }: Repository) => ({
  findAll: () => medicalFile.findAll(),
  create: (args: MedicalFileCreateParams) => medicalFile.create(args),
  get: (id: string) => medicalFile.findOneById(id),
});
