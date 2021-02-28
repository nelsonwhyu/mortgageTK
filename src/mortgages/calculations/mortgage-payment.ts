import { amortizeLifePayments } from './amortize-life-payments'
import { mortgageProgramConfig } from '../mortgage-program-config'
import { setupMaster } from 'cluster';

export const calculateMortgagePayment = ( mortgage: Mortgage): MortgagePayments => {
    
    const amortizationTable: AmortizedPeriodicFlow[] = amortizeLifePayments(mortgage);
    const mortgageProgram: string = mortgage.mortgageProgram;
    const initialRateMonths: number | null = mortgageProgramConfig[mortgageProgram].initialRateMonths;
    const rateProgression: number[] = amortizationTable.map(period => period.rate);
    const periodicPaymentProgression: number[] = amortizationTable.map(period => period.payment);
    const periodicInterestProgression: number[] = amortizationTable.map(period => period.interest);
    const totalInterest: number = periodicInterestProgression.reduce( (acc, curr) => acc + curr )
    const loanAmount: number = mortgage.loanAmount;
    
    return(
        {
            initialPeriodicPayment: amortizationTable[0].payment,
            initialAdjustedPeriodicPayment: initialRateMonths ? amortizationTable[initialRateMonths].payment : amortizationTable[0].payment,
            lifeCappedAdjustedPeriodicPayment: initialRateMonths ? Math.max(...periodicPaymentProgression) : amortizationTable[0].payment,
            rateProgression,
            periodicPaymentProgression,
            totalInterest,
            interestToPrincipalRatio: totalInterest/loanAmount,
            amortizationTable: amortizationTable 
        }
    )
}

const testingMortgage: Mortgage = {
    loanAmount: 320800,
    interestRate: 0.03125,
    mortgageProgram: "10_1_InterestOnly"
}

console.log(calculateMortgagePayment(testingMortgage));