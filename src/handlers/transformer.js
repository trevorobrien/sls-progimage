exports.handler = async (event, context) => {

  const transform = require('./transform')
  const imageBuffer = Buffer.from(event.msg, 'base64')
  console.log('REQ', imageBuffer)
  const queryParams = event.params

  return result = await transform.index(imageBuffer, queryParams)

}