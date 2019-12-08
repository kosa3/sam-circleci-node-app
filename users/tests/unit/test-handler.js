'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');
var event, context;

describe('Tests users', function () {
    AWSMock.mock('S3', 'getObject', [{}])
    it('verifies successful response', async () => {
        const s3 = new AWS.S3();
        expect(await app.getUsers(s3)).to.be.an('array');

        AWSMock.restore('S3', 'getObject')
    });
});
