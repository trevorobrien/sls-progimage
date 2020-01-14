// not currently being used
const fileType = require('file-type')

exports.mimeData = (data) => {

  try {
    const mimeinfo = fileType(data)

    if (!mimeinfo) {
      return null
    }
    return mimeinfo
  } catch (e) {
    console.log("ERROR", e)
  }

}