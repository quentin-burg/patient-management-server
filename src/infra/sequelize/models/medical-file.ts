import { BelongsToSetAssociationMixin, DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
import { MedicalFileCreateParams } from '../../../shared.types';
import { MedicalFile } from '../../../domain/entities/medical-file';
import { MedicalFilePort } from '../../../domain/ports/medical-file';
import { UserInstance } from './user';
import { ConsultationInstance } from './consultation';
import { Consultation } from '../../../domain/entities/consultation';
import { toEntity as toConsultation } from './consultation';

interface MedicalFileAttr {
  id: string;
  parity: number;
  gravidity: number;
}

interface MedicalFileCreationAttributes extends Optional<MedicalFileAttr, 'id'> {}

export interface MedicalFileInstance extends Model<MedicalFileAttr, MedicalFileCreationAttributes>, MedicalFileAttr {
  patientId: string;
  professionalId: string;
  addConsultation: BelongsToSetAssociationMixin<ConsultationInstance, Consultation>;
  consultations: ConsultationInstance[];
}

const toEntity = (m: MedicalFileInstance): MedicalFile => ({
  id: m.id,
  parity: m.parity,
  gravidity: m.gravidity,
  patientId: m.patientId,
  professionalId: m.professionalId,
  consultations: m.consultations.map(c => toConsultation(c)),
});

export default (sequelize: Sequelize) => (User: ModelStatic<UserInstance>) => {
  const MedicalFile = sequelize.define<MedicalFileInstance>('MedicalFile', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    parity: DataTypes.INTEGER,
    gravidity: DataTypes.INTEGER,
  });

  const MedicalFileAdapter: MedicalFilePort = {
    findAll: () => MedicalFile.findAll().then(mfs => mfs.map(toEntity)),
    create: ({ gravidity, parity, patientId, professionalId }: MedicalFileCreateParams) =>
      User.findOne({ where: { id: patientId } })
        .then(patient => Promise.all([patient, User.findOne({ where: { id: professionalId } })]))
        .then(([patient, professional]) =>
          sequelize
            .transaction(transaction =>
              MedicalFile.create({ gravidity, parity }, { transaction }).then(file => {
                return Promise.all([
                  file,
                  patient?.addPatientFile(file, { transaction }),
                  professional?.addProfessionalFile(file, { transaction }),
                ]);
              }),
            )
            .then(([file]) => MedicalFile.findOne({ where: { id: file.id } })),
        )
        .then(mf => (mf ? toEntity(mf) : Promise.reject('Error when creating medical file.'))),
    findOneById: (id: string) =>
      MedicalFile.findOne({ where: { id }, include: 'consultations' }).then(mf =>
        mf ? toEntity(mf) : Promise.reject('Medical file not found.'),
      ),
  };
  return { MedicalFile, MedicalFileAdapter };
};
