#!/usr/bin/env node

const path = require("path");
const woof = require("woof");
const { renderTask, renderEmpty } = require("../lib/render");
const { searchDirectory } = require("../index");

const cli = woof(
  `
  Usage
    $ git-todo [options]

  Options
    --quick, -q              Don't get blame information
    --verbose, -v            Show an expanded output
    --directory, -d <path>   Specify a directory relative to the one you are currently in
    --filter, -f <string>    Filter todos by the given string
    --author, -a <author>    Filter todos by the author
`,
  {
    flags: {
      directory: {
        type: "string",
        alias: "d",
        default: process.cwd(),
      },
      verbose: {
        type: "boolean",
        alias: "v",
      },
      quick: {
        type: "boolean",
        alias: "q",
        default: false,
      },
      filter: {
        type: "string",
        alias: "f",
      },
      author: {
        type: "string",
        alias: "a",
      },
    },
  },
);

if (cli.help) {
  process.exit(0);
}

(async function () {
  let totalFound = 0;

  const directory = cli.directory
    ? path.resolve(process.cwd(), cli.directory)
    : process.cwd();

  await searchDirectory(
    directory,
    cli.filter,
    cli.quick,
    cli.author,
    (error, found) => {
      if (error) console.log("Error:", error);
      process.stdout.write(renderTask(found, cli.verbose) + "\n");
      totalFound++;
    },
  );

  if (!totalFound) {
    process.stdout.write(renderEmpty() + "\n");
  }
})();
