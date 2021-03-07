import { createMortgage } from './mortgages';
import { createProperty } from './properties';
import { createInvestor } from './investors';
import { mortgageProgramConfig } from './mortgages/mortgage-program-config';
import { createDeal } from './deals'

const hague: Property = createProperty({
    id: "2",
    street: "2600 John F. Kennedy Blvd",
    apt: "6C",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07306",
    type: "Condo",
    sqft: 881,
    monthlyHOA: 500,
    annualTax: 3500,
    bedrooms: 2,
    bathrooms: 1,
    fairValue: 401000,
    askingPrice: 401000,
    monthlyRent: 2400,
    annualAppreciation: 0.05,
    annualInsurance: 800
})

const tenHuron: Property = createProperty({
    id: "1",
    street: "10 Huron Ave",
    apt: "10P",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07306",
    type: "Condo",
    sqft: 882,
    monthlyHOA: 523,
    annualTax: 5900,
    bedrooms: 1,
    bathrooms: 1,
    fairValue: 380000,
    askingPrice: 380000,
    monthlyRent: 2100,
    annualAppreciation: 0.05,
    annualInsurance: 590
})

const nelson: Investor = createInvestor({
    name: "Nelson",
    cash: 150000,
    annualIncome: 160000,
    taxRate: 0.35,
    monthlyFixedExpense: 1022,
    monthlyVariableExpense: 2500,
    properties: [
        {id: "1", property:tenHuron, occupancyType:"Primary"},
        {id: "2", property:hague, occupancyType:"Investment"}
    ],
    qualifiedMortgageRate: {
        "Investment": {
            "30_Year_Fixed": {
                interestRate: 0.025
            } 
        }
    },
})

const deal: Deal = createDeal({
    investor: nelson,
    collateralProperty: tenHuron,
    purchaseProperty: hague,
    loanToValue: 0.8,
    closingCost: 10000,
    defaultInterestRate: 0.025,
    mortgageProgram: "30_Year_Fixed",
    occupancy: "Investment",
    managementPctFee: 0
})

console.log(deal.downPayment);

