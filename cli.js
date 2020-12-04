#!/usr/bin/env node

const chalk = require('chalk')
const parseArgs = require('minimist')
const { downloadTask } = require('./lib/task')

const params = parseArgs(process.argv.slice(2))
const projectName = params._[0]

downloadTask({ name: projectName })
  .then(() => {
    console.log(chalk.blue(`cd ${projectName}`))
    console.log(chalk.blue(`npm or yarn run dev`))
  })

