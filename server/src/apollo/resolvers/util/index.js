const path = require('path');
const {unlinkSync} = require('fs')

// REMOVES FILE OBJECTS FROM SERVER
exports.deleteFiles = (files) => {
  files.forEach(file => {
    const url = path.join(__dirname, '..', '..', '..', 'tmp-music', file)
    unlinkSync(url)
    return true
  })
}