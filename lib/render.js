const chalk = require('chalk')
const figures = require('figures')

function renderTask ({ todo, committer, fullPath, timeSinceCommit }, verbose = false) {
  const { content, users, hashtags, line, column } = todo

  let task = `${figures('●')} ${chalk.grey(timeSinceCommit)} ${chalk.bold(content)}`

  if (users) {
    task += ' ' + users.map((u) => '@' + chalk.blue(u)).join(', ')
  }

  if (hashtags) {
    task += ' ' + hashtags.map((u) => '#' + chalk.yellow(u)).join(', ')
  }

  if (verbose) {
    task += `\n  ${fullPath} (${line}:${column})`
  }

  return task
}

module.exports = {
  renderTask
}
