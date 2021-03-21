export interface Property extends PropertyInput {
    address: string;
    monthlyTax: number;
    monthlyInsurance: number;
    pricePerSqft: number;
}
export interface PropertyInput {
    id: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zipCode: string;
    type: PropertyType;
    fairValue: number;
    askingPrice: number;
    sqft: number;
    bedrooms: number | null;
    bathrooms: number | null;
    monthlyHOA: number | null;
    annualTax: number;
    monthlyRent: number;
    annualAppreciation: number;
    annualInsurance: number;
}
export declare type PropertyType = "Condo" | " Coop" | "Single-Family" | "Multi-Family" | "Commercial";
export declare const createProperty: (propertyInput: PropertyInput) => Property;
//# sourceMappingURL=index.d.ts.map