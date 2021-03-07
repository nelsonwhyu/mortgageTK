interface Investor extends InvestorInput{
    monthlyPreTaxIncome: number;
    monthlyPostTaxIncome: number;
}

interface InvestorInput {
    name: string;
    cash: number;
    annualIncome: number;
    taxRate: number;
    monthlyFixedExpense: number;
    monthlyVariableExpense: number;
    properties: PropertyOwnerShip[];
    qualifiedMortgageRate: {
        [key in OccupancyType]?: {
            [key in MortgageProgram]?: {
                interestRate: number
            }
        }
    };
}

interface InvestorQualifiedMortgage {
    occupancy: OccupancyType;
    mortgageProgram: MortgageProgram;
    interestRate: number;
}

type OccupancyType = "Primary" | "Second" | "Investment";