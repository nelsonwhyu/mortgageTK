export interface PaymentsContext {
    loanAmount: number;
    interestRate: number;
    paymentFreqPerYear: number; 
    loanLifeInMonths: number;
    interestOnly: boolean;
}

export const calculatePeriodicPayments = ( monthlyPaymentContext: PaymentsContext ): number => {

    const {loanAmount, interestRate, paymentFreqPerYear, loanLifeInMonths, interestOnly} = monthlyPaymentContext;
    const periodicRate:number = interestRate/paymentFreqPerYear;
    return (
        interestOnly
        ? loanAmount * periodicRate
        : loanAmount 
            * (periodicRate * ((1 + periodicRate)**(loanLifeInMonths * paymentFreqPerYear/12)))
            / (((1 + periodicRate)**(loanLifeInMonths * paymentFreqPerYear/12)) - 1)       
    )
};