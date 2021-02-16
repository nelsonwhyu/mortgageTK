export interface PaymentsContext {
    loanAmount: number;
    interestRate: number;
    paymentFreqPerYear: number;
    loanLifeInMonths: number;
    interestOnly: boolean;
}
export declare const calculatePeriodicPayments: (monthlyPaymentContext: PaymentsContext) => number;
