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
    properties: PropertyInput[];
}

