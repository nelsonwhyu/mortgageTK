import { createMortgage } from './mortgages';
import { createProperty } from './properties';
import { createInvestor } from './investors';

const hague: Property = createProperty({
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
    askingPrice: 401000
})

const tenHuron: Property = createProperty({
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
    askingPrice: 401000
})

const nelson: Investor = createInvestor({
    name: "Nelson",
    cash: 150000,
    annualIncome: 160000,
    taxRate: 0.35,
    monthlyFixedExpense: 1022,
    monthlyVariableExpense: 2500,
    properties: [tenHuron]
})

console.log(nelson.properties);

