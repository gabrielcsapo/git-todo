const chalk = require('chalk')
const figures = require('figures')

function renderEmpty () {
  return `${chalk.green(figures.tick)} no todos found!`
}

function renderTask ({ todo, author, fullPath, timeSinceCommit }, verbose = false) {
  const { content, users, hashtags, line, column } = todo

  let task = `${figures('●')}`

  // this won't be available in quick mode
  if (author) {
    task += ` @${chalk.blue(author)}`
  }
  if (timeSinceCommit) {
    task += ` ${chalk.grey(timeSinceCommit)}`
  }

  task += ` "${chalk.bold(content)}"`

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
  renderEmpty,
  renderTask
}
