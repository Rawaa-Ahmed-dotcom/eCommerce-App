export const simulatePayment = async (cardData) => {
    const { cardNumber, ccv } = cardData;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!ccv || ccv.length < 3) {
                return reject(new Error("CCV is invalid."));
            }
            if (!cardNumber || cardNumber.length < 14) {
                return reject(new Error("Card number is invalid."));
            }

            const mockTransactionId = "txn_" + Math.random().toString(36).substring(2, 11);

            resolve(mockTransactionId);
        }, 1500);
    });
}