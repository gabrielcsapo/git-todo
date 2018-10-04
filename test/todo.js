const test = require('tape')
const {
  parse
} = require('../lib/todo')

test('@todo', (t) => {
  t.test('should not parse a todo from an empty line', (t) => {
    t.notOk(parse(0, ''))

    t.end()
  })

  t.test('should be able to parse simple todo', (t) => {
    t.plan(4)

    for (const todo of ['TODO: this should work', 'todo: this should work', 'fixme: this should work', 'FIXME: this should work']) {
      t.deepEqual(parse(0, todo), {
        content: 'this should work',
        line: 0,
        column: 0
      })
    }

    t.end()
  })

  t.test('should be able to parse simple todo with user assigned', (t) => {
    t.plan(4)

    for (const todo of ['TODO: @gcsapo this should work', 'todo: @gcsapo this should work', 'FIXME: @gcsapo this should work', 'fixme: @gcsapo this should work']) {
      t.deepEqual(parse(0, todo), {
        content: 'this should work',
        line: 0,
        column: 0,
        users: ['gcsapo']
      })
    }

    t.end()
  })

  t.test('should be able to parse simple todo with user assigned and hashtags', (t) => {
    t.plan(4)

    for (const todo of ['TODO: @gcsapo this should work #foo #bar', 'todo: @gcsapo this should work #foo #bar', 'fixme: @gcsapo this should work #foo #bar', 'FIXME: @gcsapo this should work #foo #bar']) {
      t.deepEqual(parse(0, todo), {
        content: 'this should work',
        line: 0,
        column: 0,
        users: ['gcsapo'],
        hashtags: ['foo', 'bar']
      })
    }

    t.end()
  })
})
