const index = async (imageBuffer, queryParams) => {

  const sharp = require('sharp')
  const fileType = require('file-type')
  const { jsonResponse, imageResponse, supportedInputMime } = require('../../utils')

  const transforms = {
    options: {
      blur: parseFloat(queryParams.blur || null),
      width: parseFloat(queryParams.width || null),
      height: parseFloat(queryParams.height || null),
      rotateAngle: parseFloat(queryParams.rotateangle || null),
    }
  }
  console.log('PIPELINE', transforms.options)
  const data = await sharp(imageBuffer)
    .resize(transforms.options.width || null, transforms.options.height || null)
    .blur(transforms.options.blur || null)
    .rotate(transforms.options.rotateAngle || null)
    .toBuffer()

  const result = new Buffer(data).toString('base64')
  return data.toString('base64')
}

module.exports = {
  index
}