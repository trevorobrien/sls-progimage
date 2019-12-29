const AWS = require("aws-sdk")
const { bucketName } = process.env
const s3 = new AWS.S3({})
/**
 * @param {data} image data
 * @param {string} key
 * @param {string} key
 */
const uploadFile = async (data, key, mime) => {
  // return s3
  //   .putObject({
  //     Bucket: bucketName,
  //     Key: key,
  //     Body: data,
  //     ContentType: mime
  //   })
  //   .promise()
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: mime
  }
  try {

    const s3Response = await s3.putObject(params).promise()
    // console.log('s3r', s3Response)
    return s3Response
  } catch (e) {
    console.error('s3err', e)
    return 'error'
  }
}

const uploadFile1 = async (data, key, mime) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: data,
    ContentType: mime
  }
  try {
    const s3Response = await s3.putObject(params).promise()
    console.log('s3r', s3Response)
    return s3Response
  } catch (e) {
    console.error('s3err', e)
    return 'error'
  }
}


module.exports = {
  uploadFile,
  uploadFile1
}