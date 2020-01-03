const uuid = require("uuid/v4")

const s3Client = require('./s3client')
const { jsonResponse, imgResponse } = require('./utils')

const mimeType = require('./mimedata')

exports.handler = async (event, context) => {
  if (!event.body) {
    return (jsonResponse(400, { message: 'A JSON object with a base64 image is required in the request body to use this service.' }))
  } else {

    try {
      const req = JSON.parse(event.body)
      const data = Buffer.from(req.image, 'base64')
      const mimeInfo = mimeType.mimeData(data)

      if (mimeInfo) {
        const objectId = uuid()
        const objectKey = `${objectId}.${mimeInfo.ext}`

        const s3Response = await s3Client.uploadFile(data, objectKey, mimeInfo.mime)
        // console.log('TEST', s3Response)

        if (s3Response.statusCode === 400) {
          return (jsonResponse(400, { message: 'An error during file upload occured' }))
        } else {
          return (jsonResponse(200, { message: JSON.stringify(objectKey) }))
        }
      } else {
        // probably malformed payload
        return (jsonResponse(400, { message: 'File mimeType not recognized' }))
      }
    } catch (e) {
      if (e.name == 'SyntaxError') {
        return (jsonResponse(400, { message: 'A valid JSON object is required.' }))
      } else {
        console.log('req', e)
        return (jsonResponse(400, { message: 'An unknown error has occured.' }))
      }
      console.log('req', e)
    }
  }
}