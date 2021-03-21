import { MortgageProgram } from '../mortgages'

export interface Investor extends InvestorInput{
    monthlyPreTaxIncome: number;
    monthlyPostTaxIncome: number;
}

export interface InvestorInput {
    name: string;
    cash: number;
    annualIncome: number;
    taxRate: number;
    monthlyFixedExpense: number;
    monthlyVariableExpense: number;
    qualifiedMortgageRate: {
        [key in OccupancyType]?: {
            [key in MortgageProgram]?: {
                interestRate: number
            }
        }
    };
}

export interface InvestorQualifiedMortgage {
    occupancy: OccupancyType;
    mortgageProgram: MortgageProgram;
    interestRate: number;
}

export type OccupancyType = "Primary" | "Second" | "Investment";

export const createInvestor = (investorInput: InvestorInput): Investor => {
    const {annualIncome, taxRate} = investorInput;
    const monthlyPreTaxIncome: number = annualIncome/ 12;
    const discountedRate: number = 1 - taxRate;
    const monthlyPostTaxIncome: number = monthlyPreTaxIncome * discountedRate;

    return(
        {
            monthlyPreTaxIncome,
            monthlyPostTaxIncome,
            ...investorInput
        }
    )
}