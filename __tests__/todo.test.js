import { test, describe, expect } from "vitest";
import { parse } from "../lib/todo";

describe("@todo", () => {
  test("should not parse a todo from an empty line", () => {
    expect(parse(0, "")).toBeFalsy();
  });

  test("should be able to parse simple todo", () => {
    expect.assertions(4);

    for (const todo of [
      "TODO: this should work",
      "todo: this should work",
      "fixme: this should work",
      "FIXME: this should work",
    ]) {
      expect(parse(0, todo)).toEqual({
        content: "this should work",
        rawContent: todo,
        line: 0,
        column: 0,
      });
    }
  });

  test("should be able to parse simple todo with user assigned", () => {
    expect.assertions(4);

    for (const todo of [
      "TODO: @gcsapo this should work",
      "todo: @gcsapo this should work",
      "FIXME: @gcsapo this should work",
      "fixme: @gcsapo this should work",
    ]) {
      expect(parse(0, todo)).toEqual({
        content: "this should work",
        rawContent: todo,
        line: 0,
        column: 0,
        users: ["gcsapo"],
      });
    }
  });

  test("should be able to parse simple todo with user assigned and hashtags", () => {
    expect.assertions(4);

    for (const todo of [
      "TODO: @gcsapo this should work #foo #bar",
      "todo: @gcsapo this should work #foo #bar",
      "fixme: @gcsapo this should work #foo #bar",
      "FIXME: @gcsapo this should work #foo #bar",
    ]) {
      expect(parse(0, todo)).toEqual({
        content: "this should work",
        rawContent: todo,
        line: 0,
        column: 0,
        users: ["gcsapo"],
        hashtags: ["foo", "bar"],
      });
    }
  });
});
