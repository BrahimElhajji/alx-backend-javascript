const request = require('request');
const { expect } = require('chai');
const app = require('./api'); // Import the Express app
const http = require('http');

let server;

before(done => {
  server = app.listen(7865, () => {
    console.log('Server is running on port 7865');
    done();
  });
});

after(done => {
  server.close(done);
});

describe('Index page', () => {
  it('Returns status code 200', done => {
    request('http://localhost:7865', (error, response, body) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Returns the welcome message', done => {
    request('http://localhost:7865', (error, response, body) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
