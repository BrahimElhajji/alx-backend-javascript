const request = require('supertest');
const { expect } = require('chai');
const app = require('./api');

describe('Index page', () => {
  it('should return the correct status code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should return the correct result', (done) => {
    request(app)
      .get('/')
      .expect('Welcome to the payment system', done);
  });
});

describe('/available_payments endpoint', () => {
  it('should return available payment methods', (done) => {
    request(app)
      .get('/available_payments')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
      })
      .end(done);
  });
});

describe('/login endpoint', () => {
  it('should return a welcome message', (done) => {
    request(app)
      .post('/login')
      .send({ userName: 'Betty' })
      .expect(200)
      .expect('Welcome Betty', done);
  });
});

describe('Cart page', () => {
  it('should return correct status code when :id is a number', (done) => {
    request.get('http://localhost:7865/cart/12', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('should return 404 status code when :id is NOT a number', (done) => {
    request.get('http://localhost:7865/cart/hello', (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
