import { mortgageProgramConfig } from '../mortgage-program-config';
import { amortizePeriodicPayments, AmortizationContext } from './amortize-periodic-payments';
import { calculatePeriodicPayments, PaymentsContext } from './calculate-periodic-payment';

interface RateAdjustment {
    rate: number,
    periodsCount: number
}

export const amortizeLifePayments = ( mortgage: Mortgage ): AmortizedPeriodicFlow[] => {
    const { loanAmount, interestRate, mortgageProgram } = mortgage;
    const { 
        loanLifeInMonths, 
        adjustFreq, 
        paymentFreqPerYear, 
        benchMark, 
        capStructure, 
        floor, 
        initialRateMonths, 
        interestOnly 
    } = mortgageProgramConfig[mortgageProgram];

    if (initialRateMonths) {
        const rateProgression: RateAdjustment[] = computeRateProgression({interestRate, loanLifeInMonths, initialRateMonths, adjustFreq, capStructure});
        const lifeAmortizationTable: AmortizedPeriodicFlow[] = [];
        for (let adj of rateProgression){
            const periodsPast: number = ( lifeAmortizationTable.length === 0) ? 0 : Math.max(...lifeAmortizationTable.map( period => period.period));
            const amortizationContext: AmortizationContext = {
                startingPeriod: ( lifeAmortizationTable.length === 0) ? 1 : Math.max(...lifeAmortizationTable.map( period => period.period )) + 1,
                interestRate: adj.rate,
                loanLifeInMonths: ( lifeAmortizationTable.length === 0) ? loanLifeInMonths : loanLifeInMonths - periodsPast ,
                periodsCount: adj.periodsCount,
                paymentFreqPerYear,
                periodBeginningBalance: ( lifeAmortizationTable.length === 0) 
                    ? loanAmount 
                    :lifeAmortizationTable[lifeAmortizationTable.length-1].periodEndingBalance,
                interestOnly: (periodsPast < initialRateMonths) ? interestOnly : false
            }
            const periodicAmortizationTable: AmortizedPeriodicFlow[] = amortizePeriodicPayments(amortizationContext);
            lifeAmortizationTable.push(...periodicAmortizationTable)
        }
        return lifeAmortizationTable;

    } else {
        const amortizationContext: AmortizationContext = {
            periodBeginningBalance: loanAmount,
            interestRate: interestRate,
            loanLifeInMonths,
            periodsCount: loanLifeInMonths,
            startingPeriod: 1,
            paymentFreqPerYear,
            interestOnly
        }
        return ( amortizePeriodicPayments(amortizationContext) );
    }

}; 

const computeRateProgression = ( rateAdjustmentContext: 
    {
        interestRate: number,
        initialRateMonths: number,
        adjustFreq: number | null,
        loanLifeInMonths: number,
        capStructure: number[] | null
    } 
): RateAdjustment[] => {

    const {interestRate, initialRateMonths, adjustFreq, loanLifeInMonths, capStructure} = rateAdjustmentContext;
    const initialAdjustmentCap: number = capStructure ? capStructure[0]/100 : 0;
    const incrementalAdjustmentCap: number = capStructure ? capStructure[1]/100 : 0;
    const lifeAdjustmentCap: number = capStructure ? capStructure[2]/100 : 0;
    
    const rateAdjustmentVector: {rateAdjustment: number, periodsCount:number}[] = [
        { 
            rateAdjustment: 0 , 
            periodsCount: initialRateMonths 
        },
        { 
            rateAdjustment: initialAdjustmentCap , 
            periodsCount: (( initialAdjustmentCap === lifeAdjustmentCap ) ? loanLifeInMonths - initialRateMonths : adjustFreq ) as number
        }
    ];
    while( Math.max(...rateAdjustmentVector.map(adj => adj.rateAdjustment)) < lifeAdjustmentCap ) {
        const newRate: number = Math.min(
            Math.max(...rateAdjustmentVector.map(adj => adj.rateAdjustment)) + incrementalAdjustmentCap,
            lifeAdjustmentCap   
        );

        const periodsPast: number = rateAdjustmentVector.map( adj => adj.periodsCount).reduce( (acc, current) => acc + current);

        rateAdjustmentVector.push({
            rateAdjustment: newRate,
            periodsCount: (newRate === lifeAdjustmentCap)? loanLifeInMonths - periodsPast : adjustFreq as number
        })
    }

    return (
        rateAdjustmentVector.map(
            adj => (
                { 
                    rate: adj.rateAdjustment + interestRate, 
                    periodsCount: adj.periodsCount
                }
            )
        )
    );
}


const testingMortgage: Mortgage = {
    loanAmount: 320800,
    interestRate: 0.03125,
    mortgageProgram: "5_1_ARM"
}

console.log(amortizeLifePayments(testingMortgage)[359]);