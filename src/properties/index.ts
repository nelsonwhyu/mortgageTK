export interface Property extends PropertyInput{
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

export type PropertyType = "Condo" | " Coop" | "Single-Family" | "Multi-Family" | "Commercial";

export const createProperty = (propertyInput: PropertyInput): Property => {
    const {street, apt, city, state, zipCode, annualTax, askingPrice, sqft, fairValue, annualInsurance} = propertyInput;
    const address: string = `${street}${apt? " " + apt : ""}, ${city}, ${state} ${zipCode}`;
    const monthlyTax: number = annualTax/12;
    const pricePerSqft: number = askingPrice/sqft;
    const monthlyInsurance: number = annualInsurance/12;

    return(
        {
            address,
            monthlyTax,
            pricePerSqft,
            monthlyInsurance,
            ...propertyInput,
            fairValue: fairValue ? fairValue : askingPrice
        }
    )
}