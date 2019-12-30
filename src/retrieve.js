exports.handler = async (event, context) => {

  const AWS = require("aws-sdk")
  const sharp = require('sharp')
  const fileType = require('file-type')

  const { jsonResponse, imageResponse } = require('./utils')
  const { bucketName } = process.env

  return (jsonResponse(200, { message: 'Initial image retrieval service' }))

}