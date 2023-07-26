# git-todo

> ✓ getting things done with git

[![Npm Version](https://img.shields.io/npm/v/git-todo.svg)](https://www.npmjs.com/package/git-todo)
[![npm](https://img.shields.io/npm/dt/git-todo.svg)]()
[![npm](https://img.shields.io/npm/dm/git-todo.svg)]()

## Installation

```
npm install git-todo -g
```

## Usage

```
$ git-todo --help

Usage
  $ git-todo [options]

Options
  --quick, -q              Don't get blame information
  --verbose, -v            Show an expanded output
  --directory, -d <path>   Specify a directory relative to the one you are currently in
  --filter, -f <string>    Filter todos by the given string
  --author, -a <author>    Filter todos by the author
```

## Output

> git todo

```
● @foo 1d "foo bar"
● @foo 1d "foo bar" @gcsapo #foo, #bar
```

> git todo --quick

```
● 1d "foo bar" @gcsapo #foo, #bar
● 1d "foo bar" @gcsapo
```

> git todo --verbose

```
● @foo 1d "foo bar" @gcsapo
  /foo/bar.js (12:0)
● @bar 1d "foo bar" @gcsapo #foo, #bar
  /foo/boo.js (12:0)
```
