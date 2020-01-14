const debug = require('debug')('s3client')
const AWS = require("aws-sdk")
const { bucketName } = process.env
const s3 = new AWS.S3({})

const uploadFile = async (data, key, mime) => {
  debug('beginning s3 upload')
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: mime
  }
  const s3Response = await s3.putObject(params).promise()
  // debug('Response from s3 upload', s3Response)
  return s3Response
}

const getFile = async (key) => {
  debug('getting file from s3')
  const params = {
    Bucket: bucketName,
    Key: key
  }
  const s3Response = await s3.getObject(params).promise()
  // debug('Response from s3 upload', s3Response)
  return s3Response
}

module.exports = {
  uploadFile,
  getFile
}