#!/usr/bin/env node

const woof = require('woof')
const { renderTask } = require('../lib/render')
const { getGitIgnore, searchDirectory } = require('../index')

const cli = woof(`
  Usage
    $ git-todo [options]

  Options
    --verbose, -v           Show an expanded output
`, {
  flags: {
    verbose: {
      type: 'boolean',
      alias: 'v'
    }
  }
})

if (cli.help) {
  process.exit(0)
}

(async function () {
  const ignoredFiles = await getGitIgnore()

  const found = await searchDirectory(process.cwd(), ignoredFiles)

  for (const find of found) {
    process.stdout.write(renderTask(find, cli.verbose) + '\n')
  }
}())
