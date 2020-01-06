const fileType = require('file-type')

/**
 * @param {data}
 */
exports.mimeData = (data) => {

  const mimeinfo = fileType(data)

  if (!mimeinfo) {
    return null
  }
  return mimeinfo
}