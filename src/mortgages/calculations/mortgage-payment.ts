import { amortizeLifePayments } from './amortize-life-payments'
import { mortgageProgramConfig } from '../mortgage-program-config'
import { MortgageInput, MortgagePayments, AmortizedPeriodicFlow} from '../index';

export const calculateMortgagePayment = ( mortgageInput: MortgageInput): MortgagePayments => {
    
    const amortizationTable: AmortizedPeriodicFlow[] = amortizeLifePayments(mortgageInput);
    const mortgageProgram: string = mortgageInput.mortgageProgram;
    const initialRateMonths: number | null = mortgageProgramConfig[mortgageProgram].initialRateMonths;
    const rateProgression: number[] = amortizationTable.map(period => period.rate);
    const periodicPaymentProgression: number[] = amortizationTable.map(period => period.payment);
    const periodicInterestProgression: number[] = amortizationTable.map(period => period.interest);
    const totalInterest: number = periodicInterestProgression.reduce( (acc, curr) => acc + curr )
    const loanAmount: number = mortgageInput.loanAmount;
    
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