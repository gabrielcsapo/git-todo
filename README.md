# git-todo

> ✓ getting things done with git

[![Npm Version](https://img.shields.io/npm/v/git-todo.svg)](https://www.npmjs.com/package/git-todo)
[![Build Status](https://travis-ci.org/gabrielcsapo/git-todo.svg?branch=master)](https://travis-ci.org/gabrielcsapo/git-todo)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/git-todo.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/git-todo)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-todo/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-todo)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-todo/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-todo#info=devDependencies)
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
   --verbose, -v           Show an expanded output
```

## Output

> git todo

```
● 1d foo bar @gcsapo
● 1d foo bar @gcsapo #foo, #bar
```

> git todo --verbose

```
● 1d foo bar @gcsapo
  /foo/bar.js (12:0)
● 1d foo bar @gcsapo #foo, #bar
  /foo/boo.js (12:0)
```
