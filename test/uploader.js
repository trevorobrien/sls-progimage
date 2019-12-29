'use strict'

// tests for uploader
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('uploader', '/src/uploader.js', 'handler')

// Create default event
let event = {
  httpMethod: 'post',
  body: {},
  headers: {
    'Content-Type': 'application/json'
  }
}

const badImage = require('./data/badimage.json')
const goodImage = require('./data/goodimage.json')

describe('uploader', () => {
  before((done) => {
    done()
  })

  it('it should require an image supplied in the request body', () => {
    const result = 'A JSON object with a base64 image is required in the request body to use this service.'
    return wrapped.run({}).then((response) => {
      // console.log('TESTOUPUT', response)
      expect(response).to.not.be.empty
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.contain(result)
    })
  })
  it('it should accept and process JSON with valid base64 image', () => {
    let _event = Object.assign({},event,{
      body: JSON.stringify(goodImage)
    })
    const result = 'png'
    return wrapped.run(_event).then((response) => {
      expect(response).to.not.be.empty
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.contain(result)
    })
  })
  it('it should fail when mimetype cant be extracted from body request', () => {
    let _event = Object.assign({},event,{
      body: JSON.stringify(badImage)
    })
    const result = 'File mimeType not recognized'
    return wrapped.run(_event).then((response) => {
      expect(response).to.not.be.empty
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.contain(result)
    })
  })
  it('it should fail when body is not valid JSON', () => {
    let _event = Object.assign({},event,{
      body: badImage
    })
    const result = 'A valid JSON object is required'
    return wrapped.run(_event).then((response) => {
      expect(response).to.not.be.empty
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.contain(result)
    })
  })

})
