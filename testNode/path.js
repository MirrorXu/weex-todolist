const path = require('path')
console.log('__dirname:', __dirname)
console.log("path.resolve(__dirname , '..'):", path.resolve(__dirname, '..'))
console.log('process.platform:', process.platform)
console.log('path.extname("index.js") :', path.extname("index.js"))