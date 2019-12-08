let response;
const AWS = require('aws-sdk')

const config = {
    endpoint: (process.env.NODE_ENV === 'local' ? 'http://docker.for.mac.host.internal:4572' : ''),
    s3ForcePathStyle: process.env.NODE_ENV === 'local',
}

const s3 = new AWS.S3(config)

exports.lambdaHandler = async (event, context) => {
    try {
        const jsonObject = await s3.getObject({
            Bucket: (process.env.NODE_ENV === 'local' ? 'test-bucket': process.env.S3_BUCKET),
            Key: 'sample.json'
        }).promise();

        response = {
            'statusCode': 200,
            'body': JSON.stringify(JSON.parse(jsonObject.Body.toString()))
        }
    } catch (err) {
        return err;
    }

    return response
};
