const sharp = require('sharp')
const fileType = require('file-type')
const path = require('path')

const s3Client = require('../../s3client')
const pipeline = require('../pipeline')
const { jsonResponse, imageResponse, getExtension, supportedInputMime } = require('../../utils')

const { bucketName } = process.env

const index = async (queryParams) => {

  try {
    const { objectKey } = queryParams
    // Get file key and ext
    const format = getExtension(objectKey)
    const filename = path.basename(objectKey, path.extname(objectKey))
    let { Body: body } = await s3Client.getFile(filename)

    // hook for starting image editing prior to formatting
    if (queryParams.edit) {
      const { edit } = queryParams
      const image = await pipeline.index(body, queryParams)
      body = Buffer.from(image, 'base64')
    }

    const mimeInfo = fileType(Buffer.from(body, 'base64'))
    console.log('FORMAT', format)
    if (mimeInfo.ext === format || !format) {
      // no conversion required so just return image
      return (imageResponse(200, new Buffer(body).toString('base64'), `${mimeInfo.ext}`))
    } else {

      if (supportedInputMime.includes(format)) {
        const data = await sharp(body)
          .toFormat(format)
          .toBuffer()
        return (imageResponse(200, data.toString('base64'), `${format}`))
      } else {
        return (jsonResponse(400, { message: 'The specified format is not allowed.' }))
      }
      return (imageResponse(200, new Buffer(body).toString('base64'), `${mimeInfo.ext}`))
      return (jsonResponse(400, { message: 'Somethis else.' }))
    }
  } catch (e) {

    if (e.code === 'NoSuchKey') {
      return (jsonResponse(404, { message: 'The requested key does not exist' }))
    }
    console.log('error from retrieve', e)
    return (jsonResponse(400, { message: 'An unknown error' }))
  }

}

module.exports = {
  index
}