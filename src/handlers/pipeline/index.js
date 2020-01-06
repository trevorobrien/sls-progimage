exports.index = async (image, params) => {
  const AWS = require("aws-sdk")
  const { jsonResponse, imageResponse, supportedInputMime } = require('../../utils')
  const lambda = new AWS.Lambda({
    endpoint: process.env.INVOKE_ENDPOINT, // need to move to isDev config
  });
  //test interop
  const lambdaParams = {
    FunctionName: process.env.INVOKE_TRANSFORMER, //the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({
      msg: image.toString('base64'),
      params: params
    })
  }
  const lambdaResult = await lambda.invoke(lambdaParams).promise()
  const resultObject = lambdaResult.Payload
  return (resultObject)
}