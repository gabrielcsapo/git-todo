const test = require('tape')
const figures = require('figures')
const { renderTask } = require('../lib/render')

test('@render', (t) => {
  t.test('should be able to render a simple todo', (t) => {
    const task = renderTask({ todo: { content: 'foo bar', column: 0 }, timeSinceCommit: '1d', line: 12 })

    t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m \x1b[1mfoo bar\x1b[22m`)

    t.end()
  })

  t.test('should be able to render a todo with users', (t) => {
    const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], column: 0 }, timeSinceCommit: '1d', line: 12 })

    t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m \x1b[1mfoo bar\x1b[22m @\x1b[34mgcsapo\x1b[39m`)

    t.end()
  })

  t.test('should be able to render a todo with users and hashtags', (t) => {
    const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], hashtags: ['foo', 'bar'], column: 0, line: 12 }, timeSinceCommit: '1d', line: 12 })

    t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m \x1b[1mfoo bar\x1b[22m @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m`)

    t.end()
  })

  t.test('should be able to render a todo with users and hashtags (verbose)', (t) => {
    const task = renderTask({ todo: { content: 'foo bar', users: ['gcsapo'], hashtags: ['foo', 'bar'], column: 0, line: 12 }, timeSinceCommit: '1d', line: 12 }, true)

    t.equal(task, `${figures('●')} \x1b[90m1d\x1b[39m \x1b[1mfoo bar\x1b[22m @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m\n  undefined (12:0)`)

    t.end()
  })
})
