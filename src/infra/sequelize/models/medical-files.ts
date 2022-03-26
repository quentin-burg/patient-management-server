import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
// import { MedicalFile } from '../../../domain/entities/consultation/medical-file';
import { MedicalFilesPort } from '../../../domain/ports/medical-files';
// import { Patient as PatientEntity } from '../../../domain/entities/identity/patient';
// import { PatientRegisterParams } from '../../../shared.types';

interface MedicalFilesAttr {
  id: string;
}

interface MedicalFilesCreationAttributes extends Optional<MedicalFilesAttr, 'id'> {}

export interface MedicalFilesInstance
  extends Model<MedicalFilesAttr, MedicalFilesCreationAttributes>,
    MedicalFilesAttr {}

// const toEntity = (m: MedicalFilesInstance): MedicalFile => ({
//   id: m.id,
// });

export default (sequelize: Sequelize) => {
  const MedicalFiles = sequelize.define<MedicalFilesInstance>('MedicalFiles', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
  });

  const MedicalFilesAdapter: MedicalFilesPort = {
    findAll: () => MedicalFiles.findAll(),
  };
  return { MedicalFiles, MedicalFilesAdapter };
};
