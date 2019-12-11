let response;
const AWS = require('aws-sdk')

const config = {
    endpoint: 'http://127.0.0.1:4572',
    s3ForcePathStyle: true,
}

const s3 = new AWS.S3(process.env.NODE_ENV === 'local' ? config : '')

exports.lambdaHandler = async () => {
    try {
        const jsonObject = await module.exports.getUsers(s3);

        response = {
            'statusCode': 200,
            'body': JSON.stringify(JSON.parse(jsonObject.Body.toString()))
        }
    } catch (err) {
        return err;
    }

    return response
};

exports.getUsers = (s3) => {
    return s3.getObject({
        Bucket: (process.env.NODE_ENV === 'local' ? 'test-bucket': process.env.S3_BUCKET),
        Key: 'sample.json'
    }).promise()
}