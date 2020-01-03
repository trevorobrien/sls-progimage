exports.handler = async (event, context) => {
  const sharp = require('sharp')
  const fileType = require('file-type')
  const { jsonResponse, imageResponse, supportedInputMime } = require('./utils')
  
  const req = Buffer.from(event.msg, 'base64')

  const data = await sharp(req)
              .blur(2)
              .toBuffer()

  const result = new Buffer(data).toString('base64')
  return data.toString('base64') 

}