"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mortgageProgramConfig = void 0;
exports.mortgageProgramConfig = {
    "30_Year_Fixed": {
        loanLifeInMonths: 360,
        initialRateMonths: 360,
        paymentFreqPerYear: 12,
        adjustFreq: null,
        interestOnly: false,
        benchMark: null,
        capStructure: null,
        floor: null,
    },
    "15_Year_Fixed": {
        loanLifeInMonths: 180,
        initialRateMonths: 180,
        paymentFreqPerYear: 12,
        adjustFreq: null,
        interestOnly: false,
        benchMark: null,
        capStructure: null,
        floor: null,
    },
    "3_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 36,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "5_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 60,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "7_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 84,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "10_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 120,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "3_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 36,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "5_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 60,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "7_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 84,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
    "10_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 120,
        paymentFreqPerYear: 12,
        adjustFreq: 12,
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5, 2, 5],
        floor: 2,
    },
};
//# sourceMappingURL=mortgage-program-config.js.map