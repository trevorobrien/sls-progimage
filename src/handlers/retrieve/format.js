const debug = require('debug')('retrieve-handler')
const AWS = require("aws-sdk")
const sharp = require('sharp')
const { jsonResponse, imageResponse, getExtension, supportedMimeType } = require('../../utils')

// outputFormat = requested format 
// mimeInfo = current mimeinfor
// image = ....
const index = async (image, mimeInfo, outputFormat) => {
  debug('formatting image for output')
  if (mimeInfo.ext === outputFormat || !outputFormat) {
    debug(mimeInfo)
    // no conversion required so just return image
    debug('input/ output formats are the same')
    return (imageResponse(200, Buffer.from(image).toString('base64'), `${mimeInfo.ext}`))
  } else {
    // check if requested format is supported
    debug('input/ output formats are different')
    debug('checking whether mimetype is supported')
    if (supportedMimeType.includes(outputFormat)) {
      debug('mimetype is supported', outputFormat)
      const data = await sharp(image)
        .toFormat(outputFormat)
        .toBuffer()
      return (imageResponse(200, data.toString('base64'), `${outputFormat}`))
    } else {
      debug('mimetype is not supported', outputFormat)
      return (jsonResponse(400, { message: 'The specified outputFormat is not allowed.' }))
    }
    // return (imageResponse(200, Buffer.from(image).toString('base64'), `${mimeInfo.ext}`))
  }
}

module.exports = {
  index
}