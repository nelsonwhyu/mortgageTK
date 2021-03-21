import { MortgageProgram } from '../mortgages';
export interface Investor extends InvestorInput {
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
                interestRate: number;
            };
        };
    };
}
export interface InvestorQualifiedMortgage {
    occupancy: OccupancyType;
    mortgageProgram: MortgageProgram;
    interestRate: number;
}
export declare type OccupancyType = "Primary" | "Second" | "Investment";
export declare const createInvestor: (investorInput: InvestorInput) => Investor;
//# sourceMappingURL=index.d.ts.map