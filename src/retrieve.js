exports.handler = async (event, context) => {

  const sharp = require('sharp')
  const fileType = require('file-type')
  const s3Client = require('./s3client')
  const processor = require('./processor')
  const { jsonResponse, imageResponse, supportedInputMime } = require('./utils')
  const { bucketName } = process.env

  if (!event.queryStringParameters || !event.queryStringParameters.objectKey) {
    return (jsonResponse(400, { message: 'The objectKey query param is required' }))
  } else {

    try {
      const { objectKey } = event.queryStringParameters
      let { Body: body } = await s3Client.getFile(objectKey)
      let test
      // hook for starting image editing prior to formatting
      if (event.queryStringParameters.edit) {
        const { edit } = event.queryStringParameters
        const image = await processor.blur(body)
        body = Buffer.from(image, 'base64')
        console.log('EDIT', test)
      }

      if (event.queryStringParameters.format) {
        const format = event.queryStringParameters.format
        if (supportedInputMime.includes(format)) {
          const data = await sharp(body)
            .toFormat(format)
            .toBuffer()
          console.log(data)
          return (imageResponse(200, data.toString('base64'), `${format}`))
        } else {
          return (jsonResponse(400, { message: 'The specified format is not allowed.' }))
        }
      } else {
        // no conversion required so just return image
        const mimeInfo = fileType(Buffer.from(body, 'base64'))
        return (imageResponse(200, new Buffer(body).toString('base64'), `${mimeInfo.ext}`))
      }
    } catch (e) {
      if (e.code === 'NoSuchKey') {
        return (jsonResponse(404, { message: 'The requested key does not exist' }))
      }
      console.log('error from retrieve', e)
      return (jsonResponse(400, { message: 'An unknown error' }))
    }
  }
}