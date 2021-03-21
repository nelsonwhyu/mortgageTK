export interface Mortgage extends MortgageInput, MortgagePayments {
}
export interface MortgageInput {
    loanAmount: number;
    interestRate: number;
    mortgageProgram: MortgageProgram;
}
export interface MortgagePayments {
    initialPeriodicPayment: number;
    initialAdjustedPeriodicPayment: number;
    lifeCappedAdjustedPeriodicPayment: number;
    rateProgression: number[];
    periodicPaymentProgression: number[];
    totalInterest: number;
    interestToPrincipalRatio: number;
    amortizationTable: AmortizedPeriodicFlow[];
}
export interface AmortizedPeriodicFlow {
    period: number;
    payment: number;
    rate: number;
    interest: number;
    principal: number;
    periodEndingBalance: number;
}
export declare type MortgageProgram = "30_Year_Fixed" | "15_Year_Fixed" | "3_1_ARM" | "5_1_ARM" | "7_1_ARM" | "10_1_ARM" | "3_1_InterestOnly" | "5_1_InterestOnly" | "7_1_InterestOnly" | "10_1_InterestOnly";
export declare const createMortgage: (mortgageInput: MortgageInput) => Mortgage;
//# sourceMappingURL=index.d.ts.map