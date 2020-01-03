// export const supportedInputMime = ['jpeg', 'png', 'tiff', 'webp']

exports.blur = async (data) => {
  const AWS = require("aws-sdk")
  const { jsonResponse, imageResponse, supportedInputMime } = require('../utils')
  console.log('INSIDE blur')
  const lambda = new AWS.Lambda({
    // endpoint: process.env.INVOKE_ENDPOINT,  // need to move to isDev config
  });

  const image = data

  //test interop
  const lambdaParams = {
    FunctionName: process.env.INVOKE_BLUR, //the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ msg: image.toString('base64') })
  }

    const lambdaResult = await lambda.invoke(lambdaParams).promise()
    console.log('LAMBDA', lambdaResult)
    const resultObject = lambdaResult.Payload
    return (resultObject)
}