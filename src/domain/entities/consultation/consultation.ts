import { Term } from './term';

export type Consultation = {
  id: string;
  report: string;
  term: Term;
  images: string[];
};
