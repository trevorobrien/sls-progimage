const { jsonResponse } = require('../utils')

exports.handler = async (event, context) => {
  const format = require('./format')

  if (!event.queryStringParameters || !event.queryStringParameters.objectKey) {
    return (jsonResponse(400, { message: 'The objectKey query param is required' }))
  } else {
    const queryParams = event.queryStringParameters
    return result = await format.index(queryParams)
  }
}
