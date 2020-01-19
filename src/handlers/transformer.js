const debug = require('debug')('transform-handler')
const transform = require('./transform')

exports.handler = async (event) => {
  debug('TRANSFORM FUNCTION')

  const imageBuffer = Buffer.from(event.msg, 'base64')
  const queryParams = event.params
  const result = await transform.index(imageBuffer, queryParams)
  return result
}
