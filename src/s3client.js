const AWS = require("aws-sdk")
const { bucketName } = process.env
const s3 = new AWS.S3({})

const { jsonResponse, imgResponse } = require('./utils')

/**
 * @param {data} image data
 * @param {key} filename
 * @param {mime} mimetype
 */
const uploadFile = async (data, key, mime) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: mime
  }
    const s3Response = await s3.putObject(params).promise()
    return s3Response
}

const getFile = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  }
  const s3Response = await s3.getObject(params).promise()
  // console.log('s3error from client', s3Response)
  return s3Response
}

module.exports = {
  uploadFile,
  getFile
}