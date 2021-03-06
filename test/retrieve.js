// tests for retrieve
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')

const { expect } = mochaPlugin.chai
const wrapped = mochaPlugin.getWrapper('retrieve', '/src/handlers/retriever.js', 'handler')

describe('retrieve', () => {
  before((done) => {
    done()
  })

  it('it should fail if no object key is provided', () => {
    const queryStringParameters = { objectKey: '' }
    const result = 'The objectKey query param is required'
    return wrapped.run({ queryStringParameters }).then((response) => {
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.contain(result)
    })
  })
  it('it should return a JPEG true if object key is provided with .jpeg', () => {
    const queryStringParameters = { objectKey: '46e40eaa-ea83-45fc-a9f0-f30ba7454ad8.jpeg' }
    return wrapped.run({ queryStringParameters }).then((response) => {
      expect(response.statusCode).to.equal(200)
      expect(response.isBase64Encoded).to.equal(true)
      expect(response.headers).to.deep.equal({ 'Content-Type': 'image/jpeg' })
    })
  })
  it('it should return a PNG if no object key extension is provided', () => {
    const queryStringParameters = { objectKey: '46e40eaa-ea83-45fc-a9f0-f30ba7454ad8' }
    return wrapped.run({ queryStringParameters }).then((response) => {
      expect(response.statusCode).to.equal(200)
      expect(response.isBase64Encoded).to.equal(true)
      expect(response.headers).to.deep.equal({ 'Content-Type': 'image/png' })
    })
  })
})
