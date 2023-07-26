// Used to render the examples in the README.md

const { renderTask } = require("../../lib/render");

const tasks = [
  {
    todo: { content: "foo bar", users: ["gcsapo"], column: 0, line: 12 },
    timeSinceCommit: "1d",
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
    timeSinceCommit: "5w",
    fullPath: "/foo/boo.js",
  },
];

for (const verbose of [false, true]) {
  tasks.forEach((t) => console.log(renderTask(t, verbose)));
}
