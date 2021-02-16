export interface AmortizationContext {
    startingPeriod: number;
    periodBeginningBalance: number;
    interestRate: number;
    loanLifeInMonths: number;
    periodsCount: number;
    paymentFreqPerYear: number;
    interestOnly: boolean;
}
export declare const amortizePeriodicPayments: (amortizationContext: AmortizationContext) => AmortizedPeriodicFlow[];
