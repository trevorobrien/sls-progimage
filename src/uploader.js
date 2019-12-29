const uuid = require("uuid/v4")

const s3Client = require('./s3client')
const { jsonResponse, imgResponse } = require('./utils')

const mimeType = require('./mimedata')

exports.handler = (event, context, callback) => {
  if (!event.body) {
    callback(null, {
      statusCode: 400,
      body: 'A JSON object with a base64 image is required in the request body to use this service.'
    })
  } else {

    const req = JSON.parse(event.body)
    const data = Buffer.from(req.image, 'base64')
  
    const mimeInfo = mimeType.mimeData(data)

    if (mimeInfo) {
      const objectId = uuid()
      const objectKey = `${objectId}.${mimeInfo.ext}`

      s3Client.uploadToS3(data, objectKey, mimeInfo.mime)

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(objectKey)
      })
    } else {
      // probably malformed payload
      callback(null, {
        statusCode: 400,
        body: 'File mimeType not recognized'
      })
    }
  }
}
