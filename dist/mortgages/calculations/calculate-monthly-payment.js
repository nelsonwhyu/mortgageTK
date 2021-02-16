"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mortgage_program_config_1 = require("../../mortgage-program-config");
const calculateMonthlyPayments = (mortgage) => {
    const { loanAmount, interestRate, mortgageProgram } = mortgage;
    const { paymentFreqPerYear, loanLifeInMonths } = mortgage_program_config_1.mortgageProgramConfig[mortgageProgram];
    return (loanAmount
        * (Math.pow((1 + interestRate / paymentFreqPerYear), loanLifeInMonths))
        / ((Math.pow((1 + interestRate / paymentFreqPerYear), loanLifeInMonths)) - 1));
};
const testingMortgage = {
    loanAmount: 320800,
    interestRate: 0.3125,
    mortgageProgram: "30_Year_Fixed"
};
console.log(calculateMonthlyPayments(testingMortgage));
//# sourceMappingURL=calculate-monthly-payment.js.map