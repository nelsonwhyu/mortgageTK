export interface MortgageProgramProps{
    loanLifeInMonths: number;
    paymentFreqPerYear: number;
    initialRateMonths: number | null;
    adjustFreq: number | null;
    interestOnly: boolean;
    benchMark: Indices | null;
    capStructure: number[] | null;
    floor: number | null;
}

export const mortgageProgramConfig: { [key:string]:MortgageProgramProps } = {
    "30_Year_Fixed": {
        loanLifeInMonths: 360,
        initialRateMonths: null,
        paymentFreqPerYear: 12,
        adjustFreq: null,        
        interestOnly: false,
        benchMark: null,
        capStructure: null,
        floor: null,
    },
    "15_Year_Fixed": {
        loanLifeInMonths: 180,
        initialRateMonths: null,
        paymentFreqPerYear: 12,
        adjustFreq: null,   
        interestOnly: false,
        benchMark: null,
        capStructure: null,
        floor: null,
    } ,
    "3_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 36,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "5_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 60,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [2,2,5],
        floor: 2,
    } ,
    "7_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 84,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "10_1_ARM": {
        loanLifeInMonths: 360,
        initialRateMonths: 120,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: false,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "3_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 36,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "5_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 60,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "7_1_InterestOnly": {
        loanLifeInMonths: 360,
        initialRateMonths: 84,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,
    },
    "10_1_InterestOnly": {        
        loanLifeInMonths: 360,
        initialRateMonths: 120,
        paymentFreqPerYear: 12,
        adjustFreq: 12,   
        interestOnly: true,
        benchMark: "LIBOR",
        capStructure: [5,2,5],
        floor: 2,},
}