"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeal = void 0;
const mortgages_1 = require("../mortgages");
const createDeal = (dealInput) => {
    var _a, _b, _c;
    const { investor, purchaseProperty, collateralProperty, loanToValue, defaultInterestRate, mortgageProgram, managementPctFee, closingCost, occupancy } = dealInput;
    const loanAmount = collateralProperty.askingPrice * loanToValue;
    const downPayment = purchaseProperty.askingPrice - loanAmount;
    const investorInterestRate = (_c = (_b = (_a = investor.qualifiedMortgageRate) === null || _a === void 0 ? void 0 : _a[occupancy]) === null || _b === void 0 ? void 0 : _b[mortgageProgram]) === null || _c === void 0 ? void 0 : _c.interestRate;
    const interestRate = (investorInterestRate) ? investorInterestRate : defaultInterestRate;
    const mortgage = mortgages_1.createMortgage({
        loanAmount,
        interestRate,
        mortgageProgram
    });
    const monthlyHOA = purchaseProperty.monthlyHOA ? purchaseProperty.monthlyHOA : 0;
    const monthlyTax = purchaseProperty.monthlyTax;
    const monthlyInsurance = purchaseProperty.monthlyInsurance;
    const monthlyEscrow = mortgage.initialPeriodicPayment + monthlyTax + monthlyInsurance;
    const monthlyPropertyExpense = monthlyEscrow + monthlyHOA;
    const monthlyPropertyIncome = purchaseProperty.monthlyRent * (1 - managementPctFee);
    const discountedPropertyIncome = monthlyPropertyIncome * 10 / 12;
    const postDealOverallFixedExpense = investor.monthlyFixedExpense + monthlyPropertyExpense;
    const postDealOverallMonthlyIncome = investor.monthlyPostTaxIncome + discountedPropertyIncome;
    const postDealOverallMonthlySavings = postDealOverallMonthlyIncome - postDealOverallFixedExpense - investor.monthlyVariableExpense;
    const postDealCash = investor.cash - downPayment - closingCost;
    const postDealCashPerEscrowInMonths = postDealCash / monthlyEscrow;
    const annualPercentRate = (((closingCost + mortgage.totalInterest) / loanAmount)
        / mortgage.amortizationTable.length) * 100;
    const noIncomePaymentSurvivingMonths = postDealCash / postDealOverallFixedExpense;
    const noIncomeLifeSurvivingMonths = postDealCash / (postDealOverallFixedExpense + investor.monthlyVariableExpense);
    return (Object.assign({ mortgage,
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
        noIncomeLifeSurvivingMonths }, dealInput));
};
exports.createDeal = createDeal;
//# sourceMappingURL=index.js.map