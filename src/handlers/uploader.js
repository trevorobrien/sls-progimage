const debug = require('debug')('upload-handler')
const upload = require('./upload')
const { jsonResponse } = require('../utils')

exports.handler = async (event) => {
  debug('UPLOAD SERVICE')
  if (!event.body) {
    return (jsonResponse(400, { msg: 'A JSON object with a base64 image is required in the request body to use this service.' }))
  }
  try {
    const req = JSON.parse(event.body)
    const image = Buffer.from(req.image, 'base64')
    debug('got base64 image into buffer')
    const result = await upload.index(image)
    return result
  } catch (e) {
    debug('error', e)
    if (e.name === 'SyntaxError') {
      debug('error', e)
      return (jsonResponse(400, { msg: 'A valid JSON object is required.' }))
    }
    debug('error', e)
    return (jsonResponse(400, { msg: 'An unknown error has occured.' }))
  }
}
