"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvestor = void 0;
const createInvestor = (investorInput) => {
    const { annualIncome, taxRate } = investorInput;
    const monthlyPreTaxIncome = annualIncome / 12;
    const discountedRate = 1 - taxRate;
    const monthlyPostTaxIncome = monthlyPreTaxIncome * discountedRate;
    return (Object.assign({ monthlyPreTaxIncome,
        monthlyPostTaxIncome }, investorInput));
};
exports.createInvestor = createInvestor;
//# sourceMappingURL=index.js.map