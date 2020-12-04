const { downloadTask } = require('./lib/task')

function create({ name }) {
  return downloadTask({ name })
}

module.exports = { create }