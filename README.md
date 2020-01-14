# serverless-image-processor


Caveats
- payload limit of 6mb with Lambda functions
- need to look into warming up lambda to avoid slow start
- having one lambda call another to do the transforms doesnt make much sense now but it might if you were batch uploading files and wanted to process them in parallel 

Things to do
- explore using the signedURLs approach would work for uploading files
- theres a better way to do the image transforms - look at the note in /transform
- setup different environments 
- more test coverage required both unit & end to end
- need to optmize packaging for serverless deployment
- add auth / lock down api gateway


This is a [Serverless](https://serverless.com) project for image processing with lambda and sharp on aws. 

Request flow is:  
User -> API Gateway -> Lambda

## Demo
https://b5u67w4qf1.execute-api.eu-west-1.amazonaws.com/dev/retriever?objectKey=ee1376b3-fb26-4862-a5ee-0718a27163e7.webp
https://b5u67w4qf1.execute-api.eu-west-1.amazonaws.com/dev/retriever?objectKey=ee1376b3-fb26-4862-a5ee-0718a27163e7.webp&edit=true&height=300&rotateangle=90

## Supported formats
['jpeg', 'png', 'tiff', 'webp']

## Query params
objectKey 

Edit - required to enable transformations
Width
Height
Blur
Rotate

## Formatting
Add the desired extension to the object key during the retrieve request

## Local development
1. ```$ npm install```
2. ```$ npm start```

## Tests
1. ```$ npm run test```

## Serverless local with logging on (super helpful)
sls offline --printOutput