const debug = require('debug')('transform-handler')
const sharp = require('sharp')

const index = async (imageBuffer, queryParams) => {
  debug('transforming these settings', queryParams)

  // TODO dont really like how this works - look at moving to stream so I can do something like
  // transform = transform.toFormat('png')
  // inputstream.pipe(transform).toBuffer()


  // TODO constraint checking on things like size / blur level
  const transforms = {
    options: {
      blur: parseFloat(queryParams.blur),
      width: parseFloat(queryParams.width),
      height: parseFloat(queryParams.height),
      rotateAngle: parseFloat(queryParams.rotateangle),
    },
  }

  const data = await sharp(imageBuffer)
    .resize(transforms.options.width || null, transforms.options.height || null)
    .blur(transforms.options.blur || null)
    .rotate(transforms.options.rotateAngle || null)
    .toBuffer()

  return data.toString('base64')
}

module.exports = {
  index,
}
