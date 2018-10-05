const test = require('tape')
const figures = require('figures')
const chalk = require('chalk')
const { renderTask, renderEmpty } = require('../lib/render')

test('@render', (t) => {
  t.test('@renderEmpty', (t) => {
    t.test('should render empty state', (t) => {
      const empty = renderEmpty()

      process.stdout.write(empty + '\n')

      t.equal(empty, `${chalk.green(figures.tick)} no todos found!`)

      t.end()
    })
  })

  t.test('@renderTask', (t) => {
    t.test('should be able to render a simple todo', (t) => {
      const task = renderTask({ todo: { content: 'foo bar', column: 0 }, timeSinceCommit: '1d', line: 12 })

      process.stdout.write(task + '\n')

      t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m"`)

      t.end()
    })

    t.test('should be able to render a simple todo with an author', (t) => {
      const task = renderTask({ todo: { content: 'foo bar', column: 0 }, author: 'foo', timeSinceCommit: '1d', line: 12 })

      process.stdout.write(task + '\n')

      t.equal(task, `${figures('●')} @\x1b[34mfoo\x1b[39m \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m"`)

      t.end()
    })

    t.test('should be able to render a todo with users', (t) => {
      const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], column: 0 }, timeSinceCommit: '1d', line: 12 })

      process.stdout.write(task + '\n')

      t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m`)

      t.end()
    })

    t.test('should be able to render a todo with users and hashtags', (t) => {
      const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], hashtags: ['foo', 'bar'], column: 0, line: 12 }, timeSinceCommit: '1d', line: 12 })

      process.stdout.write(task + '\n')

      t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m`)

      t.end()
    })

    t.test('should be able to render a todo with users and hashtags (verbose)', (t) => {
      const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], hashtags: ['foo', 'bar'], column: 0, line: 12 }, timeSinceCommit: '1d', fullPath: '/foo/bar/boo.js', line: 12 }, true)
      process.stdout.write(task + '\n')
      t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m\n  /foo/bar/boo.js (12:0)`)

      t.end()
    })
  })
})
