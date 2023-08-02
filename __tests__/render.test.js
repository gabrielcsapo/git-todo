import { test, describe, expect } from "vitest";
import figures from "figures";
import { green } from "chalk";

import { renderTask, renderEmpty } from "../lib/render.js";

describe("@render", () => {
  test("@renderEmpty", () => {
    test("should render empty state", () => {
      const empty = renderEmpty();

      process.stdout.write(empty + "\n");

      expect(empty).toBe(`${green(figures.tick)} no todos found!`);
    });
  });

  describe("@renderTask", () => {
    test("should be able to render a simple todo", () => {
      const task = renderTask({
        todo: { content: "foo bar", column: 0 },
        fullPath: "/example/bar.txt",
        time: Date.now(),
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toMatchInlineSnapshot(
        '"● [90m53y[39m \\"[1mfoo bar[22m\\"- [90m/example/bar.txt[39m"'
      );
    });

    test("should be able to render a simple todo with an author", () => {
      const task = renderTask({
        todo: { content: "foo bar", column: 0 },
        fullPath: "/example/bar.txt",
        author: "foo",
        time: Date.now(),
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toMatchInlineSnapshot(
        '"● @[34mfoo[39m [90m53y[39m \\"[1mfoo bar[22m\\"- [90m/example/bar.txt[39m"'
      );
    });

    test("should be able to render a todo with users", () => {
      const task = renderTask({
        todo: { content: "foo bar", users: ["gcsapo"], column: 0 },
        fullPath: "/example/bar.txt",
        time: Date.now(),
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toMatchInlineSnapshot(
        '"● [90m53y[39m \\"[1mfoo bar[22m\\" @[34mgcsapo[39m- [90m/example/bar.txt[39m"'
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
        fullPath: "/example/bar.txt",
        time: Date.now(),
        line: 12,
      });

      process.stdout.write(task + "\n");

      expect(task).toMatchInlineSnapshot(
        '"● [90m53y[39m \\"[1mfoo bar[22m\\" @[34mgcsapo[39m #[33mfoo[39m, #[33mbar[39m- [90m/example/bar.txt[39m"'
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
          time: Date.now(),
          fullPath: "/foo/bar/boo.js",
          line: 12,
        },
        true
      );
      process.stdout.write(task + "\n");

      expect(task).toMatchInlineSnapshot(`
        "● [90m53y[39m \\"[1mfoo bar[22m\\" @[34mgcsapo[39m #[33mfoo[39m, #[33mbar[39m
          /foo/bar/boo.js (12:0)- [90m/foo/bar/boo.js[39m"
      `);
    });
  });
});
