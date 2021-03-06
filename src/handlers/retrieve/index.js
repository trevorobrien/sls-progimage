const debug = require('debug')('retrieve-handler')
const fileType = require('file-type')
const path = require('path')
const s3Client = require('../../s3client')
const format = require('./format')
const edits = require('./edits')
const { jsonResponse, getExtension } = require('../../utils')

const index = async (queryParams) => {
  try {
    const { objectKey } = queryParams
    debug('filename and outputFormat if requested', objectKey)
    // Get objectkey and extension
    // outputFormat used later to compare s3 file with requested outputFormat
    const outputFormat = getExtension(objectKey)
    const filename = path.basename(objectKey, path.extname(objectKey))

    // get the file from s3
    // image = buffer
    let { Body: image } = await s3Client.getFile(filename)

    // if the edit param exists then do some image editing prior formatting
    if (queryParams.edit) {
      debug('image editing requested')
      // imageTemp = base64
      const imageTemp = await edits.index(image, queryParams)
      image = Buffer.from(imageTemp, 'base64')
      debug('image editing done')
    }

    // get mimeinfo of orig image
    const mimeInfo = fileType(image)
    debug('mimetype of original image', mimeInfo)
    const result = format.index(image, mimeInfo, outputFormat)
    return result
  } catch (e) {
    if (e.code === 'NoSuchKey') {
      return (jsonResponse(404, { message: 'The requested key does not exist' }))
    }
    debug('error from file retrieval', e)
    return (jsonResponse(400, { message: 'An unknown error occur, please contact us' }))
  }
}

module.exports = {
  index,
}
