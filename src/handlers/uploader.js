const debug = require('debug')('upload-handler')
const upload = require('./upload')
const { jsonResponse } = require('../utils')

exports.handler = async (event, context) => {

  debug('UPLOAD SERVICE')
  if (!event.body) {
    return (jsonResponse(400, { msg: 'A JSON object with a base64 image is required in the request body to use this service.' }))
  } else {

    try {
      const req = JSON.parse(event.body)
      const image = Buffer.from(req.image, 'base64')
      debug('got base64 image into buffer')
      return result = await upload.index(image)

    } catch (e) {
      debug('error', e)
      if (e.name == 'SyntaxError') {
        debug('error', e)
        return (jsonResponse(400, { msg: 'A valid JSON object is required.' }))
      } else {
        debug('error', e)
        return (jsonResponse(400, { msg: 'An unknown error has occured.' }))
      }
    }
  }
}