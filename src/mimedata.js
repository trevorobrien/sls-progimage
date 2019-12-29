const fileType = require('file-type')

/**
 * @param {data}
 * @returns {Promise}
 */
 exports.mimeData = (data) => {
  return fileType(data)
}

