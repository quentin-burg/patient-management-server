import { MedicalFileCreateParams, MedicalFileWithUsers } from '../../shared.types';
import { MedicalFile } from '../entities/medical-file';

export interface MedicalFilePort {
  findAll(): Promise<MedicalFileWithUsers[]>;
  create(args: MedicalFileCreateParams): Promise<MedicalFileWithUsers>;
  findOneById(id: string): Promise<MedicalFile>;
}
