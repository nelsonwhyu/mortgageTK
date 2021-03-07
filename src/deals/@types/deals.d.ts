interface Deal {
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

interface DealInput {
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

interface ClosingCost {
    lenderFees: LenderFees;
    titleFees: TitleFees;
    governmentFees: GovernmentFees;
    prepaidFees: PrepaidFees;
    buyerFees: BuyerFees;
}

interface LenderFees {
    applicationFee: number;
    appraisalsFee: number;
    creditReportFee: number;
    taxServiceFee: number;
    floodCertFee: number;
    buildingQuestionaireFee: number;
}

interface TitleFees {
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

interface GovernmentFees {
    recordingFee: number;
}

interface PrepaidFees {
    homeownerInsurancePremium: number;
    prepaidInterest: number;
    propertyTax: number;
}

interface BuyerFees {
    realEstateCommissionFee: number;
    attorneyFee: number;
    ownerTitleInsuranceFee: number;
}