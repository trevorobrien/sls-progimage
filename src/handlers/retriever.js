const debug = require('debug')('retrieve-handler')
const retrieve = require('./retrieve')
const { jsonResponse } = require('../utils')

exports.handler = async (event) => {
  debug('RETRIEVE SERVICE')

  if (!event.queryStringParameters || !event.queryStringParameters.objectKey) {
    return (jsonResponse(400, { message: 'The objectKey query param is required' }))
  }
  const queryParams = event.queryStringParameters
  const result = await retrieve.index(queryParams)
  return result
}
