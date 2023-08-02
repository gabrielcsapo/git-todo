import chalk from "chalk";
import figures, { replaceSymbols } from "figures";

import { ms } from "./util.js";

export function renderEmpty() {
  return `${chalk.green(figures.tick)} no todos found!`;
}

export function renderTask(
  { todo, author, authorEmail, fullPath, time },
  verbose = false,
  csv = false
) {
  const { rawContent, content, users, hashtags, line, column } = todo;

  if (csv) {
    return `"${fullPath}", ${line}, ${column}, "${author}", "${authorEmail}", "${rawContent.replace(
      /"/g,
      '""'
    )}", "${time}", "${fullPath}"`;
  }

  let task = `${replaceSymbols("●")}`;

  // this won't be available in quick mode
  if (author) {
    task += ` @${chalk.blue(author)}`;
  }

  if (time) {
    task += ` ${chalk.grey(ms(time))}`;
  }

  task += ` "${chalk.bold(content)}"`;

  if (users) {
    task += " " + users.map((u) => "@" + chalk.blue(u)).join(", ");
  }

  if (hashtags) {
    task += " " + hashtags.map((u) => "#" + chalk.yellow(u)).join(", ");
  }

  if (verbose) {
    task += `\n  ${fullPath} (${line}:${column})`;
  }

  task += `${replaceSymbols("-")} ${chalk.grey(fullPath)}`;

  return task;
}
