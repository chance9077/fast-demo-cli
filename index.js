const { downloadTask } = require('./lib/task')

function create(options) {
  return downloadTask({
    name: options.name,
    template: options.template
  })
}

module.exports = { create }