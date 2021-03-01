interface Mortgage extends MortgageInput, MortgagePayments{};

interface MortgageInput{
    loanAmount: number;
    interestRate: number;
    mortgageProgram: MortgageProgram;
}

interface MortgagePayments{
    initialPeriodicPayment: number;
    initialAdjustedPeriodicPayment: number;
    lifeCappedAdjustedPeriodicPayment: number;
    rateProgression: number[];
    periodicPaymentProgression: number[];
    totalInterest: number;
    interestToPrincipalRatio: number;
    amortizationTable: AmortizedPeriodicFlow[];
}

interface AmortizedPeriodicFlow{
    period: number;
    payment: number;
    rate: number;
    interest: number;
    principal: number;
    periodEndingBalance: number;
}

type MortgageProgram = "30_Year_Fixed" | "15_Year_Fixed" 
    | "3_1_ARM" | "5_1_ARM" | "7_1_ARM" | "10_1_ARM" 
    | "3_1_InterestOnly" | "5_1_InterestOnly" | "7_1_InterestOnly" | "10_1_InterestOnly";

type Indices = "10_Yr_Treasury" | "LIBOR" | "SOFR"

