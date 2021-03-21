import { AmortizedPeriodicFlow } from '../index';
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
//# sourceMappingURL=amortize-periodic-payments.d.ts.map