const debug = require('debug')('upload-handler')
const uuid = require('uuid/v4')
const fileType = require('file-type')
const s3Client = require('../../s3client')
const { jsonResponse, supportedMimeType } = require('../../utils')

const index = async (image) => {
  try {
    const mimeInfo = fileType(image)
    debug('checking mimetype', mimeInfo)
    if (supportedMimeType.includes(mimeInfo.ext)) {
      // generate filename for upload to s3
      const objectKey = uuid()

      const s3Response = await s3Client.uploadFile(image, objectKey, mimeInfo.mime)
      debug('response from s3', s3Response)
      if (s3Response.statusCode === 400) {
        return (jsonResponse(400, { msg: 'An error during file upload occured' }))
      }
      debug('file was uploaded successfully')
      return (jsonResponse(200, { msg: objectKey }))
    }
    // mimetype isn't supported
    return (jsonResponse(400, { msg: 'File mimeType not recognized' }))
  } catch (e) {
    debug('error', e)
    if (e instanceof TypeError) {
      return (jsonResponse(400, { msg: 'An issue with mimetype extraction.' }))
    }
    // probably malformed payload
    return (jsonResponse(400, { msg: 'An unknown error has occured.' }))
  }
}

module.exports = {
  index,
}
