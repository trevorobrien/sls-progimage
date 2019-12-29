const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const { bucketName } = process.env

/**
 * @param {data} image data
 * @param {string} key
 * @param {mime} key
 */
exports.uploadToS3 = (data, key, mime) => {
  return s3
    .putObject({
      Bucket: bucketName,
      Key: key,
      Body: data,
      ContentType: mime
    })
    .promise()
}