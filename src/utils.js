const path = require('path')

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

const imageResponse = (statusCode, body, type) => ({
  statusCode,
  headers: { 'Content-Type': `image/${type}` },
  isBase64Encoded: true,
  body,
})

const getExtension = (filename) => {
  const ext = path.extname(filename || '').split('.')
  return ext[ext.length - 1]
}

const supportedMimeType = ['jpeg', 'png', 'tiff', 'webp']

module.exports = {
  jsonResponse,
  imageResponse,
  getExtension,
  supportedMimeType,
}
