import { createMortgage } from "../mortgages";
import { Investor, OccupancyType} from '../investors'
import { Mortgage, MortgageProgram} from '../mortgages'
import { Property } from '../properties'

export interface Deal extends DealInput{
    mortgage: Mortgage;
    downPayment: number;
    monthlyPropertyExpense: number;
    monthlyPropertyIncome: number;
    discountedPropertyIncome: number;
    postDealOverallFixedExpense: number;
    postDealOverallMonthlyIncome: number;
    postDealOverallMonthlySavings: number;
    postDealCash: number;
    postDealCashPerEscrowInMonths: number;
    annualPercentRate: number;
    noIncomePaymentSurvivingMonths: number;
    noIncomeLifeSurvivingMonths: number;
}

export interface DealInput {
    investor: Investor;
    collateralProperty: Property;
    loanToValue: number;
    purchaseProperty: Property;
    closingCost: number;
    managementPctFee: number;
    defaultInterestRate: number;
    mortgageProgram: MortgageProgram;
    occupancy: OccupancyType;
}

export interface ClosingCost {
    lenderFees: LenderFees;
    titleFees: TitleFees;
    governmentFees: GovernmentFees;
    prepaidFees: PrepaidFees;
    buyerFees: BuyerFees;
}

export interface LenderFees {
    applicationFee: number;
    appraisalsFee: number;
    creditReportFee: number;
    taxServiceFee: number;
    floodCertFee: number;
    buildingQuestionaireFee: number;
}

export interface TitleFees {
    closingServiceLetter: number;
    eDocAndWireFee: number;
    endorsementFee: number;
    mileageNotaryAndOvernightFee: number;
    mortgagePayoffServiceFee: number;
    noticeOfSettlementFilingFee: number;
    settlementFee: number;
    lendersTitleInsuranceFee: number;
    searchesAndExamsFee: number;
    transactionManagementFee: number;
}

export interface GovernmentFees {
    recordingFee: number;
}

export interface PrepaidFees {
    homeownerInsurancePremium: number;
    prepaidInterest: number;
    propertyTax: number;
}

export interface BuyerFees {
    realEstateCommissionFee: number;
    attorneyFee: number;
    ownerTitleInsuranceFee: number;
}

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
            noIncomeLifeSurvivingMonths,
            ...dealInput
        }
    )
}