const assert  = require('assert')
const expect = require('chai').expect
const format = require('../../src/handlers/retrieve/format.js') 

const badImage = require('../data/badimage.json')
const goodImage = require('../data/goodimage.json')

const image = Buffer.from(goodImage.image)
const mimeInfo = { ext: 'png', mime: 'image/png' }
const outputFormat = 'png'

describe('format function', () => {
  before((done) => {
    done()
  })
  it('it should return base64 image', async () => {
    const response = await format.index(image, mimeInfo, outputFormat)
    expect(response.statusCode).to.eql(200)
    expect(response.isBase64Encoded).to.eql(true)
  })
})