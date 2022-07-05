const path = require('path')

module.exports = {
  entry:path.resolve(__dirname,'../packages/main.ts'),
  output:{
    library:'EditorSdk',
    libraryTarget:'var'
  },
}