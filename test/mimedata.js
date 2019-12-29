const assert  = require('assert')
const expect = require('chai').expect

const mimeData = require('../src/mimedata.js') 

const badImage = require('./data/badimage.json')
const goodImage = require('./data/goodimage.json')

describe('mimeData function', () => {
  before((done) => {
    done()
  })
  it('should return valid mimetype info', () => {
    const response = mimeData.mimeData(Buffer.from(goodImage.image, 'base64'))
    expect(response).to.eql({ ext: 'png', mime: 'image/png' })
  })
  it('should return null when no valid mimetype info', () => {
    const response = mimeData.mimeData(Buffer.from(badImage.image, 'base64'))
    console.log('response', response)
    expect(response).to.eql(null)
  })
})