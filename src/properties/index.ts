export const createProperty = (propertyInput: PropertyInput): Property => {
    const {street, apt, city, state, zipCode, annualTax, askingPrice, sqft, fairValue} = propertyInput;
    const address: string = `${street} ${apt}, ${state} ${zipCode}`;
    const monthlyTax: number = annualTax/12;
    const pricePerSqft: number = askingPrice/sqft;

    return(
        {
            address,
            monthlyTax,
            pricePerSqft,
            ...propertyInput,
            fairValue: fairValue ? fairValue : askingPrice
        }
    )
}