const debug = require('debug')('retrieve-handler')
const AWS = require("aws-sdk")
const { jsonResponse, imageResponse } = require('../../utils')

const index = async (image, params) => {
  debug('setting up lambda function call for transformer')
  const lambda = new AWS.Lambda({
    endpoint: process.env.INVOKE_ENDPOINT, // need to move to config
  })

  //setting up payload for lambda invoke
  const payload =
    JSON.stringify({
      msg: image.toString('base64'),
      msg2: image,
      params: params
    })

  const lambdaParams = {
    FunctionName: process.env.INVOKE_TRANSFORMER, //the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: payload
  }

  const lambdaResult = await lambda.invoke(lambdaParams).promise()
  debug('transforming complete')
  return (lambdaResult.Payload)
}

module.exports = {
  index
}