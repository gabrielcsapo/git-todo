import { parentPort, workerData } from "worker_threads";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { spawn } from "child_process";

import { parse } from "./todo.js";

const readFile = promisify(fs.readFile);

const CONTAINS_TODO = new RegExp(
  "(TODO|TODOS|FIXME|CHANGED|IDEA|HACK|NOTE|REVIEW): (.+?)",
  "i"
);

async function getBlameInformation(fullPath, fast) {
  return new Promise(function (resolve, reject) {
    try {
      let entries = {};
      let currentLine = 1;
      let author, time, authorEmail;

      // git blame /path/to/file --line-porcelain --line-porcelain package.json -w
      const child = spawn("git", ["blame", "--line-porcelain", fullPath, "-w"]);

      child.stdout.on("data", (data) => {
        // stdout has the blame information for each line
        const lines = data.toString("utf8").split("\n");
        lines.forEach((line) => {
          if (line.startsWith("author ")) {
            author = line.slice("author ".length);
          } else if (line.startsWith("author-mail ")) {
            authorEmail = line.slice("author-mail ".length);
          } else if (line.startsWith("committer-time ")) {
            time = line.slice("committer-time ".length);
          } else if (line.startsWith("\t")) {
            // line content starts with a tab
            entries[currentLine] = { author, authorEmail, time };
            currentLine++;
          }
        });
      });

      child.on("exit", () => resolve(entries));
    } catch (ex) {
      return reject(ex);
    }
  });
}

async function processFiles() {
  const { chunk, directory, filter, quick, author, ignore } = workerData;

  for (const file of chunk) {
    if (file.indexOf(".git") > -1) continue;

    try {
      const fullPath = path.resolve(directory, file);
      const content = await readFile(fullPath, "utf8");

      if (!CONTAINS_TODO.exec(content)) continue;

      const lines = content.split("\n");
      let entries = [];
      if (!quick) {
        entries = await getBlameInformation(fullPath);
      }

      lines.forEach((lineContent, i) => {
        const line = i + 1;
        const todo = parse(line, lineContent);

        if (todo) {
          if (filter && !todo.rawContent.includes(filter)) return;

          const {
            author: commitAuthor,
            authorEmail,
            time,
          } = entries[line] || {};

          if (author && !commitAuthor.includes(author)) return;

          // Emit found callback
          parentPort.postMessage({
            author: commitAuthor,
            authorEmail,
            time: Date.now() - parseInt(time) * 1000,
            fullPath,
            todo,
          });
        }
      });
    } catch (ex) {
      parentPort.postMessage({ error: ex });
    }
  }
}

processFiles();
