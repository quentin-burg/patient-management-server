"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTerm = exports.toString = exports.make = void 0;
const make = (week, day) => {
    if (week >= 0 && week <= 41 && day >= 0 && day <= 6) {
        return {
            week,
            day,
        };
    }
    else
        throw new Error('Term is not valid');
};
exports.make = make;
const toString = (term) => `${term.week}+${term.day}`;
exports.toString = toString;
const toTerm = (term) => {
    const tSplitted = term.split('+');
    return (0, exports.make)(parseInt(tSplitted[0], 10), parseInt(tSplitted[1], 10));
};
exports.toTerm = toTerm;
