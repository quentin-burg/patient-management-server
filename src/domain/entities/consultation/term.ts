export type Term = {
  week: number;
  day: number;
};

export const make = (week: number, day: number): Term => {
  if (week >= 0 && week <= 41 && day >= 0 && day <= 6) {
    return {
      week,
      day,
    };
  }
  throw new Error('Term is not valid');
};

export const toString = (term: Term) => `${term.week}+${term.day}`;
export const toTerm = (term: string): Term => {
  const tSplitted = term.split('+');
  return make(parseInt(tSplitted[0], 10), parseInt(tSplitted[1], 10));
};
