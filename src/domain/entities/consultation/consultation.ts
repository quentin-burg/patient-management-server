import { Term } from './term';
import { UltraSoundFile } from './ultra-sound-file';

export type Consultation = {
  report: string;
  term: Term;
  ultraSoundFiles: UltraSoundFile[];
};

export const buildConsultation = (report: string, term: Term, ultraSoundFiles: UltraSoundFile[]): Consultation => ({
  report,
  term,
  ultraSoundFiles,
});
