const ora = require('ora')
const download = require('download-git-repo')
const config = require('../config')
const { writeFileSync } = require('fs')
const path = require('path')

const spinner = ora(config.downloading)

function downloadTask({ name, template }) {
  spinner.start()
  return new Promise((resolve, reject) => {
    const defaultTemplate = config.template.default

    download(
      `${config.repo}/${template ? (config.template[template] || defaultTemplate) : defaultTemplate}`,
      name || config.defaultProName,
      err => {
        if (err) {
          spinner.fail(config.downloadFailText)
          reject(err)
        } else {
          spinner.succeed(config.downloadSuccess)
          rewritePackageJson(name)
          resolve()
        }
      }
    )
  })
}

function rewritePackageJson(dir) {
  const filePath = path.resolve(process.cwd(), `${dir}/package.json`)
  const name = dir.match(/[^\\\/]+$/)[0]
  const version = '0.0.1'
  try {
    const file = require(filePath)
    writeFileSync(
      filePath,
      JSON.stringify(
        Object.assign(file, { name, version }),
        undefined,
        2
      )
    )
  } catch (error) {
    console.log(`write data to package.json error.`)
  }
}

module.exports = {
  downloadTask
}
