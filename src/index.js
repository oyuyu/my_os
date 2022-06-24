const pack = require('../webpack')
const config = require('./pack.config')
const { resolve } = require('path')
const content = pack(config)
