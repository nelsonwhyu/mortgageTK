import { Investor, OccupancyType } from '../investors';
import { Mortgage, MortgageProgram } from '../mortgages';
import { Property } from '../properties';
export interface Deal {
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
export declare const createDeal: (dealInput: DealInput) => Deal;
//# sourceMappingURL=index.d.ts.map