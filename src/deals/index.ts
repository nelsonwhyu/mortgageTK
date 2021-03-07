import { createMortgage } from "../mortgages";

export const createDeal = (dealInput: DealInput): Deal => {
    const {investor, purchaseProperty, collateralProperty, loanToValue, defaultInterestRate, mortgageProgram, managementPctFee, closingCost, occupancy} = dealInput;
    const loanAmount = collateralProperty.askingPrice * loanToValue;
    const downPayment = purchaseProperty.askingPrice - loanAmount;
    const investorInterestRate: number | undefined = investor.qualifiedMortgageRate?.[occupancy]?.[mortgageProgram]?.interestRate;
    const interestRate: number = (investorInterestRate)? investorInterestRate: defaultInterestRate;
    const mortgage: Mortgage = createMortgage(
        {
            loanAmount,
            interestRate, 
            mortgageProgram 
        }
    );
    const monthlyHOA: number = purchaseProperty.monthlyHOA? purchaseProperty.monthlyHOA : 0;
    const monthlyTax: number = purchaseProperty.monthlyTax;
    const monthlyInsurance: number = purchaseProperty.monthlyInsurance;
    const monthlyEscrow: number = mortgage.initialPeriodicPayment + monthlyTax + monthlyInsurance;
    const monthlyPropertyExpense: number = monthlyEscrow + monthlyHOA;
    const monthlyPropertyIncome: number = purchaseProperty.monthlyRent * (1 - managementPctFee);
    const discountedPropertyIncome: number = monthlyPropertyIncome * 10/12;
    const postDealOverallFixedExpense: number = investor.monthlyFixedExpense + monthlyPropertyExpense;
    const postDealOverallMonthlyIncome: number = investor.monthlyPostTaxIncome + discountedPropertyIncome;
    const postDealOverallMonthlySavings: number = postDealOverallMonthlyIncome - postDealOverallFixedExpense - investor.monthlyVariableExpense;
    const postDealCash: number = investor.cash - downPayment - closingCost;
    const postDealCashPerEscrowInMonths: number = postDealCash/monthlyEscrow;
    const annualPercentRate: number = (
        ((closingCost + mortgage.totalInterest)/loanAmount)
        /mortgage.amortizationTable.length
    ) * 100;
    const noIncomePaymentSurvivingMonths: number = postDealCash/postDealOverallFixedExpense;
    const noIncomeLifeSurvivingMonths: number = postDealCash/(postDealOverallFixedExpense + investor.monthlyVariableExpense);   

    return(
        {
            mortgage,
            downPayment,
            annualPercentRate,
            monthlyPropertyIncome,
            discountedPropertyIncome,
            monthlyPropertyExpense,
            postDealOverallFixedExpense,
            postDealOverallMonthlyIncome,
            postDealOverallMonthlySavings,
            postDealCash,
            postDealCashPerEscrowInMonths,
            noIncomePaymentSurvivingMonths,
            noIncomeLifeSurvivingMonths
        }
    )
}