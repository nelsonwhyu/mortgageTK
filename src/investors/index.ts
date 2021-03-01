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