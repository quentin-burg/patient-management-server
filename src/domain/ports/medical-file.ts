import { MedicalFileCreateParams } from '../../shared.types';
import { MedicalFile } from '../entities/medical-file';

export interface MedicalFilePort {
  findAll(): Promise<MedicalFile[]>;
  create(args: MedicalFileCreateParams): Promise<MedicalFile>;
  findOneById(id: string): Promise<MedicalFile>;
}
