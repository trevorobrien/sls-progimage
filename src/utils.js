const jsonResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

const imageResponse = (statusCode, body, type) => {
  return {
    statusCode,
    headers: { 'Content-Type': `image/${type}` },
    isBase64Encoded: true,
    body,
  }
}

const supportedInputMime = ['jpeg', 'png', 'tiff', 'webp']

module.exports = {
  jsonResponse,
  imageResponse,
  supportedInputMime
}