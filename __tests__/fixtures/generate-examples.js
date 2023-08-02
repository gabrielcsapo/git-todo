// Used to render the examples in the README.md
import { renderTask } from "../../lib/render.js";

const tasks = [
  {
    todo: { content: "foo bar", users: ["gcsapo"], column: 0, line: 12 },
    time: Date.now(),
    fullPath: "/foo/bar.js",
  },
  {
    todo: {
      content: "foo bar",
      users: ["gcsapo"],
      hashtags: ["foo", "bar"],
      column: 0,
      line: 12,
    },
    time: new Date(Date.now() - 5 * 7 * 24 * 60 * 60 * 1000),
    fullPath: "/foo/boo.js",
  },
];

for (const option of [{}, { quick: true }, { verbose: true }]) {
  console.log();
  console.log(
    `> git todo ${option.quick ? "--quick" : option.verbose ? "--verbose" : ""}`
  );
  console.log();
  console.log("```sh");
  tasks.forEach((t) => console.log(renderTask(t, option)));
  console.log("```");
}
