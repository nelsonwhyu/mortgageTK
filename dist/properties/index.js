"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProperty = void 0;
const createProperty = (propertyInput) => {
    const { street, apt, city, state, zipCode, annualTax, askingPrice, sqft, fairValue, annualInsurance } = propertyInput;
    const address = `${street} ${apt}, ${city}, ${state} ${zipCode}`;
    const monthlyTax = annualTax / 12;
    const pricePerSqft = askingPrice / sqft;
    const monthlyInsurance = annualInsurance / 12;
    return (Object.assign(Object.assign({ address,
        monthlyTax,
        pricePerSqft,
        monthlyInsurance }, propertyInput), { fairValue: fairValue ? fairValue : askingPrice }));
};
exports.createProperty = createProperty;
//# sourceMappingURL=index.js.map