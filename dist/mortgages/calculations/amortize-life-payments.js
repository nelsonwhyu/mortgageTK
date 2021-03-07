"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amortizeLifePayments = void 0;
const mortgage_program_config_1 = require("../mortgage-program-config");
const amortize_periodic_payments_1 = require("./amortize-periodic-payments");
const amortizeLifePayments = (mortgageInput) => {
    const { loanAmount, interestRate, mortgageProgram } = mortgageInput;
    const { loanLifeInMonths, adjustFreq, paymentFreqPerYear, capStructure, initialRateMonths, interestOnly } = mortgage_program_config_1.mortgageProgramConfig[mortgageProgram];
    if (initialRateMonths) {
        const rateProgression = computeRateProgression({ interestRate, loanLifeInMonths, initialRateMonths, adjustFreq, capStructure });
        const lifeAmortizationTable = [];
        for (const adj of rateProgression) {
            const periodsPast = (lifeAmortizationTable.length === 0) ? 0 : Math.max(...lifeAmortizationTable.map(period => period.period));
            const amortizationContext = {
                startingPeriod: (lifeAmortizationTable.length === 0) ? 1 : periodsPast + 1,
                interestRate: adj.rate,
                loanLifeInMonths: (lifeAmortizationTable.length === 0) ? loanLifeInMonths : loanLifeInMonths - periodsPast,
                periodsCount: adj.periodsCount,
                paymentFreqPerYear,
                periodBeginningBalance: (lifeAmortizationTable.length === 0)
                    ? loanAmount
                    : lifeAmortizationTable[lifeAmortizationTable.length - 1].periodEndingBalance,
                interestOnly: (periodsPast < initialRateMonths) ? interestOnly : false
            };
            const periodicAmortizationTable = amortize_periodic_payments_1.amortizePeriodicPayments(amortizationContext);
            lifeAmortizationTable.push(...periodicAmortizationTable);
        }
        return lifeAmortizationTable;
    }
    const amortizationContext = {
        periodBeginningBalance: loanAmount,
        interestRate: interestRate,
        loanLifeInMonths,
        periodsCount: loanLifeInMonths,
        startingPeriod: 1,
        paymentFreqPerYear,
        interestOnly
    };
    return (amortize_periodic_payments_1.amortizePeriodicPayments(amortizationContext));
};
exports.amortizeLifePayments = amortizeLifePayments;
const computeRateProgression = (rateAdjustmentContext) => {
    const { interestRate, initialRateMonths, adjustFreq, loanLifeInMonths, capStructure } = rateAdjustmentContext;
    const initialAdjustmentCap = capStructure ? capStructure[0] / 100 : 0;
    const incrementalAdjustmentCap = capStructure ? capStructure[1] / 100 : 0;
    const lifeAdjustmentCap = capStructure ? capStructure[2] / 100 : 0;
    const rateAdjustmentVector = [
        {
            rateAdjustment: 0,
            periodsCount: initialRateMonths
        },
        {
            rateAdjustment: initialAdjustmentCap,
            periodsCount: ((initialAdjustmentCap === lifeAdjustmentCap) ? loanLifeInMonths - initialRateMonths : adjustFreq)
        }
    ];
    while (Math.max(...rateAdjustmentVector.map(adj => adj.rateAdjustment)) < lifeAdjustmentCap) {
        const newRate = Math.min(Math.max(...rateAdjustmentVector.map(adj => adj.rateAdjustment)) + incrementalAdjustmentCap, lifeAdjustmentCap);
        const periodsPast = rateAdjustmentVector.map(adj => adj.periodsCount).reduce((acc, current) => acc + current);
        rateAdjustmentVector.push({
            rateAdjustment: newRate,
            periodsCount: (newRate === lifeAdjustmentCap) ? loanLifeInMonths - periodsPast : adjustFreq
        });
    }
    return (rateAdjustmentVector.map(adj => ({
        rate: adj.rateAdjustment + interestRate,
        periodsCount: adj.periodsCount
    })));
};
//# sourceMappingURL=amortize-life-payments.js.map