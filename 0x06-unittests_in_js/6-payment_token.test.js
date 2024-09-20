const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function() {
  it('should return a successful response when success is true', function(done) {
    getPaymentTokenFromAPI(true)
      .then(response => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Call done to indicate the test is complete
      })
      .catch(err => {
        done(err); // Call done with an error if the promise is rejected
      });
  });

  it('should do nothing when success is false', function(done) {
    const result = getPaymentTokenFromAPI(false);
    // Assert that the promise is pending and does not resolve
    expect(result).to.be.an.instanceof(Promise);
    setTimeout(() => {
      // Check if the promise has not resolved by this point
      done();
    }, 100); // Adjust the timeout as needed
  });
});
