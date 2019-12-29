const fileType = require('file-type')

/**
 * @param {data}
 * @returns {Promise}
 */
 exports.mimeData = (data) => {

  const mimeinfo = fileType(data)
  
  if(!mimeinfo) {
    return null
  } 
  return mimeinfo
}

