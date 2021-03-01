"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMortgage = void 0;
const mortgage_payment_1 = require("./calculations/mortgage-payment");
const createMortgage = (mortgageInput) => {
    const mortgagePayments = mortgage_payment_1.calculateMortgagePayment(mortgageInput);
    return (Object.assign(Object.assign({}, mortgageInput), mortgagePayments));
};
exports.createMortgage = createMortgage;
//# sourceMappingURL=index.js.map