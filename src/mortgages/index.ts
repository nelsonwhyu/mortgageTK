import { calculateMortgagePayment } from './calculations/mortgage-payment';

export const createMortgage = ( mortgageInput: MortgageInput): Mortgage => {
    const mortgagePayments: MortgagePayments = calculateMortgagePayment(mortgageInput);
    return (
        {
            ...mortgageInput,
            ...mortgagePayments
        }
    )
}