#!/usr/bin/env node

const parseArgs = require('minimist')
const { downloadTask } = require('./lib/task')

const params = parseArgs(process.argv.slice(2))
const projectName = params._[0]

downloadTask({ name: projectName })

