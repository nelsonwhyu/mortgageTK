export interface MortgageProgramProps {
    loanLifeInMonths: number;
    paymentFreqPerYear: number;
    initialRateMonths: number | null;
    adjustFreq: number | null;
    interestOnly: boolean;
    benchMark: Indices | null;
    capStructure: number[] | null;
    floor: number | null;
}
export declare const mortgageProgramConfig: {
    [key: string]: MortgageProgramProps;
};
