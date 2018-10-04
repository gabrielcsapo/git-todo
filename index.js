const fs = require('fs')
const path = require('path')
const minimatch = require('minimatch')
const childProcess = require('child_process')
const { promisify } = require('util')
const { ms } = require('./lib/util')
const { parse } = require('./lib/todo')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const exec = promisify(childProcess.exec)

async function getGitIgnore () {
  const file = await readFile(path.resolve(process.cwd(), '.gitignore'), 'utf8')

  const ignoredFiles = file.split('\n')
    .filter((line) => {
      return line.indexOf('#') === -1 && line.trim() !== ''
    })
    .map((line) => {
      const cleanedString = line.trim()
      if (cleanedString[cleanedString.length - 1] === '/') {
        return cleanedString.substring(0, cleanedString.length - 1)
      }
      return cleanedString
    })

  return [
    ...ignoredFiles,
    '.git'
  ]
}

async function getBlameInformation (line, fullPath) {
  try {
    // git blame -L 112,112 /path/to/file --line-porcelain
    const { stdout } = await exec(`git blame -L ${line},${line} ${fullPath} --line-porcelain`)

    const entries = stdout.split('\n').reduce((obj, item) => {
      const split = item.indexOf(' ')
      const key = item.substring(0, split)
      const value = item.substring(split + 1, item.length)

      obj[key] = value

      return obj
    }, {})

    return entries
  } catch (ex) {
    return {}
  }
}

async function searchDirectory (directory, ignoredFiles) {
  let foundItems = []

  const list = await readdir(directory)

  for (const item of list) {
    const fullPath = path.resolve(directory, item)

    const _stat = await stat(fullPath)

    const ignored = ignoredFiles.find((regex) => {
      return minimatch(item, regex)
    })

    if (ignored) continue

    if (_stat.isDirectory()) {
      foundItems = foundItems.concat(await searchDirectory(fullPath, ignoredFiles))
    }

    if (_stat.isFile()) {
      const content = await readFile(fullPath, 'utf8')
      const lines = content.split('\n')

      for (var i = 0; i < lines.length; i++) {
        const line = i + 1
        const todo = parse(line, lines[i])

        if (todo) {
          const entries = await getBlameInformation(line, fullPath)

          foundItems.push({
            committer: entries ? entries['committer'] : '?',
            timeSinceCommit: entries ? ms(Date.now() - (parseInt(entries['committer-time']) * 1000)) : 0,
            fullPath,
            todo
          })
        }
      }
    }
  }

  return foundItems
}

module.exports = {
  getGitIgnore,
  searchDirectory
}
