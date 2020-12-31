const ora = require('ora')
const download = require('download-git-repo')
const config = require('../config')
const { writeFileSync } = require('fs')
const path = require('path')

const spinner = ora(config.downloading)

function downloadTask({ name }) {
  spinner.start()
  return new Promise((resolve, reject) => {
    download(
      config.repo,
      name || config.defaultProName,
      err => {
        if (err) {
          spinner.fail(config.downloadFailText)
          reject(err)
        } else {
          spinner.succeed(config.downloadSuccess)
          rewritePackageName(name)
          resolve()
        }
      }
    )
  })
}

function rewritePackageName(dir) {
  const filePath = path.resolve(process.cwd(), `${dir}/package.json`)
  const name = dir.match(/[^\\\/]+$/)[0]
  try {
    const file = require(filePath)
    writeFileSync(filePath, JSON.stringify(Object.assign(file, { name }), undefined, 2))
  } catch (error) {
    console.log(`can't find package.json file in ${dirName}`)
  }
}

module.exports = {
  downloadTask
}
