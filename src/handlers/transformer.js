const debug = require('debug')('transform-handler')
const { jsonResponse } = require('../utils')
const transform = require('./transform')

exports.handler = async (event, context) => {
  debug('TRANSFORM FUNCTION')

  const imageBuffer = Buffer.from(event.msg, 'base64')
  const queryParams = event.params

  return result = await transform.index(imageBuffer, queryParams)
}