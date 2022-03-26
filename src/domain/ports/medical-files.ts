import { MedicalFile } from '../entities/consultation/medical-file';

export interface MedicalFilesPort {
  findAll(): Promise<any>; // TODO
}
