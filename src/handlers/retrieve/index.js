const debug = require('debug')('retrieve-handler')
const sharp = require('sharp')
const fileType = require('file-type')
const path = require('path')
const s3Client = require('../../s3client')
const format = require('./format')
const edits = require('./edits')
const { jsonResponse, imageResponse, getExtension, supportedMimeType } = require('../../utils')
const { bucketName } = process.env

const index = async (queryParams) => {

  try {
    const { objectKey } = queryParams
    debug('filename and outputFormat if requested', objectKey)
    // Get objectkey and extension
    // outputFormat used later to compare s3 file with requested outputFormat
    const outputFormat = getExtension(objectKey)
    const filename = path.basename(objectKey, path.extname(objectKey))

    // get the file from s3
    let { Body: image } = await s3Client.getFile(filename)

    // if the edit param exists then do some image editing prior 1st
    if (queryParams.edit) {
      debug('image editing requested')
      const { edit } = queryParams
      const imageTemp = await edits.index(image, queryParams)
      image = Buffer.from(imageTemp, 'base64')
      debug('image editing done')
    }

    // get mimeinfo of orig image 
    const mimeInfo = fileType(Buffer.from(image, 'base64'))
    debug('mimetype of original image', mimeInfo)
    return result = format.index(image, mimeInfo, outputFormat)

  } catch (e) {

    if (e.code === 'NoSuchKey') {
      return (jsonResponse(404, { message: 'The requested key does not exist' }))
    }
    debug('error from file retrieval', e)
    return (jsonResponse(400, { message: 'An unknown error occur, please contact us' }))
  }

}

module.exports = {
  index
}