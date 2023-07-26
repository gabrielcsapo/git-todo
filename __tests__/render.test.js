import { test, describe, expect } from "vitest";
import figures, { tick } from "figures";
import { green } from "chalk";

import { renderTask, renderEmpty } from "../lib/render";

describe("@render", () => {
  test("@renderEmpty", () => {
    test("should render empty state", () => {
      const empty = renderEmpty();

      process.stdout.write(empty + "\n");

      expect(empty).toBe(`${green(tick)} no todos found!`);
    });
  });

  test("@renderTask", () => {
    test("should be able to render a simple todo", () => {
      const task = renderTask({
        todo: { content: "foo bar", column: 0 },
        timeSinceCommit: "1d",
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toBe(
        `${figures("●")} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m"`,
      );
    });

    test("should be able to render a simple todo with an author", () => {
      const task = renderTask({
        todo: { content: "foo bar", column: 0 },
        author: "foo",
        timeSinceCommit: "1d",
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toBe(
        `${figures(
          "●",
        )} @\x1b[34mfoo\x1b[39m \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m"`,
      );
    });

    test("should be able to render a todo with users", () => {
      const task = renderTask({
        todo: { content: "foo bar", users: ["gcsapo"], column: 0 },
        timeSinceCommit: "1d",
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toBe(
        `${figures(
          "●",
        )} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m`,
      );
    });

    test("should be able to render a todo with users and hashtags", () => {
      const task = renderTask({
        todo: {
          content: "foo bar",
          users: ["gcsapo"],
          hashtags: ["foo", "bar"],
          column: 0,
          line: 12,
        },
        timeSinceCommit: "1d",
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toBe(
        `${figures(
          "●",
        )} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m`,
      );
    });

    test("should be able to render a todo with users and hashtags (verbose)", () => {
      const task = renderTask(
        {
          todo: {
            content: "foo bar",
            users: ["gcsapo"],
            hashtags: ["foo", "bar"],
            column: 0,
            line: 12,
          },
          timeSinceCommit: "1d",
          fullPath: "/foo/bar/boo.js",
          line: 12,
        },
        true,
      );
      process.stdout.write(task + "\n");
      expect(task).toBe(
        `${figures(
          "●",
        )} \x1b[90m1d\x1b[39m "\x1b[1mfoo bar\x1b[22m" @\x1b[34mgcsapo\x1b[39m #\x1b[33mfoo\x1b[39m, #\x1b[33mbar\x1b[39m\n  /foo/bar/boo.js (12:0)`,
      );
    });
  });
});
