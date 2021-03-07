import { calculatePeriodicPayments } from './calculate-periodic-payment'

export interface AmortizationContext {
    startingPeriod: number;
    periodBeginningBalance: number;
    interestRate: number;
    loanLifeInMonths: number;
    periodsCount: number;
    paymentFreqPerYear: number;
    interestOnly: boolean;
}

export const amortizePeriodicPayments = ( amortizationContext: AmortizationContext ): AmortizedPeriodicFlow[] => {
    const { 
        startingPeriod,
        periodBeginningBalance,
        interestRate,
        loanLifeInMonths,
        periodsCount,
        paymentFreqPerYear,
        interestOnly
    } = amortizationContext

    const periodicPayment: number = calculatePeriodicPayments({
        loanAmount: periodBeginningBalance,
        interestRate,
        loanLifeInMonths,
        paymentFreqPerYear,
        interestOnly
    })

    const beginningAmortizedPeriodicFlow: AmortizedPeriodicFlow = {
        period: startingPeriod,
        payment: periodicPayment,
        rate: interestRate,
        interest: interestRate/paymentFreqPerYear * periodBeginningBalance,
        principal: periodicPayment - (interestRate/paymentFreqPerYear * periodBeginningBalance),
        periodEndingBalance: periodBeginningBalance - (periodicPayment - (interestRate/paymentFreqPerYear * periodBeginningBalance))
    };

    const amortizationTable: AmortizedPeriodicFlow[] = [beginningAmortizedPeriodicFlow];

    for (let i = 1; i < periodsCount ; i++ ){
        const beginningAmortizedFlow: AmortizedPeriodicFlow = amortizationTable[amortizationTable.length-1];
        const period: number = beginningAmortizedFlow.period + 1
        const beginningBalance: number = beginningAmortizedFlow.periodEndingBalance;
        const currentInterest: number = interestRate/paymentFreqPerYear * beginningBalance;
        const currentPrincipal: number = periodicPayment - currentInterest;
        const endingBalance: number = beginningBalance - currentPrincipal;   
        amortizationTable.push({
            period: period,
            payment: periodicPayment,
            rate: interestRate,
            interest: currentInterest,
            principal: currentPrincipal,
            periodEndingBalance: endingBalance,   
        })
    }

    return amortizationTable;
};