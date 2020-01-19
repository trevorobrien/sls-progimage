// not currently being used
const debug = require('debug')('mimedata')
const fileType = require('file-type')

exports.mimeData = (data) => {
  try {
    const mimeinfo = fileType(data)

    if (mimeinfo) {
      return mimeinfo
    }
  } catch (e) {
    debug('ERROR', e)
  }
  return null
}
