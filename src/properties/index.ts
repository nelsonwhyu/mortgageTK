export const createProperty = (propertyInput: PropertyInput): Property => {
    const {street, apt, city, state, zipCode, annualTax, askingPrice, sqft, fairValue, annualInsurance} = propertyInput;
    const address: string = `${street} ${apt}, ${city}, ${state} ${zipCode}`;
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