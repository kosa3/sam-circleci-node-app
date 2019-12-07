'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
const AWS = require('aws-sdk-mock');
var event, context;

describe('Tests users', function () {
    it('verifies successful response', async () => {
        AWS.mock('S3', 'getObject', () => {
            callback({}, 'success')
        })

        const result = await app.lambdaHandler(event, context)

        console.log(result)
        expect(result.statusCode).to.equal(200);

        let response = JSON.parse(result.body);
        AWS.restore('S3', 'getObject')

        expect(response).to.be.an('array');
    });
});
