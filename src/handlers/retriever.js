const debug = require('debug')('retrieve-handler')
const retrieve = require('./retrieve')
const { jsonResponse } = require('../utils')

exports.handler = async (event, context) => {
  debug('RETRIEVE SERVICE')

  if (!event.queryStringParameters || !event.queryStringParameters.objectKey) {
    return (jsonResponse(400, { message: 'The objectKey query param is required' }))
  } else {
    const queryParams = event.queryStringParameters
    return result = await retrieve.index(queryParams)
  }
}