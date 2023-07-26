const fs = require('fs')
const path = require('path')
const walk = require('ignore-walk')
const { spawn } = require('child_process')
const { promisify } = require('util')
const { ms } = require('./lib/util')
const { parse } = require('./lib/todo')

const readFile = promisify(fs.readFile)
const aWalk = promisify(walk)

const CONTAINS_TODO = new RegExp('(TODO|TODOS|FIXME|CHANGED|IDEA|HACK|NOTE|REVIEW): (.+?)', 'i')

function getBlameInformation (line, fullPath) {
  return new Promise(function (resolve, reject) {
    try {
      let entries = {}

      // git blame -L 112,112 /path/to/file --line-porcelain
      const child = spawn('git', ['blame', '-L', `${line},${line}`, fullPath, '--line-porcelain'], {
        silent: true
      })

      child.stdout.on('data', (data) => {
        entries = data.toString('utf8').split('\n').reduce((obj, item) => {
          const split = item.indexOf(' ')
          const key = item.substring(0, split)
          const value = item.substring(split + 1, item.length)

          obj[key] = value

          return obj
        }, {})
      })

      child.on('exit', () => resolve(entries))
    } catch (ex) {
      return resolve()
    }
  })
}

async function searchDirectory (directory, filter, quick, author, foundCallback) {
  const files = await aWalk({
    path: directory,
    ignoreFiles: ['.gitignore'],
    follow: false
  })

  for (const file of files) {
    if (file.indexOf('.git') > -1) continue

    try {
      const fullPath = path.resolve(directory, file)
      const content = await readFile(fullPath, 'utf8')

      if (!CONTAINS_TODO.exec(content)) continue

      const lines = content.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const line = i + 1
        const todo = parse(line, lines[i])

        if (todo) {
          if (filter && !todo.rawContent.includes(filter)) continue

          let entries
          if (!quick) {
            entries = await getBlameInformation(line, fullPath)
          }

          const commitAuthor = entries ? /<(.+?)@(.+?)>/.exec(entries['author-mail'])[1] : undefined

          if (author && !commitAuthor.includes(author)) continue

          foundCallback(null, {
            author: commitAuthor,
            timeSinceCommit: entries ? ms(Date.now() - (parseInt(entries['committer-time']) * 1000)) : 0,
            fullPath,
            todo
          })
        }
      }
    } catch (ex) {
      //
    }
  }
}

module.exports = {
  getBlameInformation,
  searchDirectory
}
