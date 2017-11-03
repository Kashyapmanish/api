'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../index.js'); // Our app
 

 describe('api/1/companies', function() {  
  this.timeout(5000); // How long to wait for a response (ms)
  before(function() {
 
  });
 
  after(function() {
 
  });

  // GET - List all colors
  it('Listing all companies', function() {
    return chai.request(app)
      .get('/api/1/companies/0')
      .then(function(res) {      	
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');        
      });
  });

  // GET - Invalid path
  it('API not Found', function() {
    return chai.request(app)
      .get('/api/1/companie/0')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);  
        console.log(err);              
      });
  });

});
 