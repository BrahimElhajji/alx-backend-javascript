// 6-payment_token.js
function getPaymentTokenFromAPI(success) {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve({ data: 'Successful response from the API' });
    }
    // If success is false, do nothing (no reject, no resolve)
  });
}

module.exports = getPaymentTokenFromAPI;
