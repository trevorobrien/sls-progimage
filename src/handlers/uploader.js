const uuid = require("uuid/v4")

const s3Client = require('../s3client')
const { jsonResponse, imgResponse } = require('../utils')

const mimeType = require('../mimedata')

exports.handler = async (event, context) => {
  if (!event.body) {
    return (jsonResponse(400, { msg: 'A JSON object with a base64 image is required in the request body to use this service.' }))
  } else {

    try {

      const req = JSON.parse(event.body)
      const data = Buffer.from(req.image, 'base64')
      const mimeInfo = mimeType.mimeData(data)

      if (mimeInfo) {
        const objectId = uuid()
        const objectKey = `${objectId}`

        const s3Response = await s3Client.uploadFile(data, objectKey, mimeInfo.mime)

        if (s3Response.statusCode === 400) {
          return (jsonResponse(400, { msg: 'An error during file upload occured' }))
        } else {
          return (jsonResponse(200, { msg: objectKey }))
        }
      } else {
        // probably malformed payload
        return (jsonResponse(400, { msg: 'File mimeType not recognized' }))
      }
    } catch (e) {
      if (e.name == 'SyntaxError') {
        console.log('error', e)
        return (jsonResponse(400, { msg: 'A valid JSON object is required.' }))
      } else {
        console.log('error', e)
        return (jsonResponse(400, { msg: 'An unknown error has occured.' }))
      }
      console.log('error', e)
    }
  }
}