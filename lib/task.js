const ora = require('ora')
const download = require('download-git-repo')
const config = require('../config')

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
          resolve()
        }
      }
    )
  })
}

module.exports = {
  downloadTask
}
