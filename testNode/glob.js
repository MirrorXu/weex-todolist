const glob = require('glob')
const help = require('../configs/helper')
const entries = glob.sync(help.resolve('src') + '**/*.vue', {})
console.log('entries:', entries)
