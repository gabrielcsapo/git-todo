const TODO_REGEX = new RegExp(
  "(TODO|TODOS|FIXME|CHANGED|IDEA|HACK|NOTE|REVIEW): (.+?)$",
  "i",
);
const USER_REGEX = /@([a-zA-Z]+)/g;
const HASHTAG_REGEX = /#([a-zA-Z]+)/g;

class Todo {
  constructor() {
    this.content = "";
  }
}

/**
 * [parse description]
 * @param  {[type]} lineNumber [description]
 * @param  {[type]} line [description]
 * @return {[type]}      [description]
 * @example
 *  TODO: @gcsapo work on this
 *  TODO: work on this
 *  TODO: @gcsapo work on this #foo #bar
 */
function parse(lineNumber, line) {
  const matched = TODO_REGEX.exec(line);

  if (matched && matched[2]) {
    const todo = new Todo();
    let content = matched[2];

    todo.rawContent = matched[0];
    todo.line = lineNumber;
    todo.column = matched.index;

    content = content.replace(USER_REGEX, (match, user) => {
      if (!todo.users) todo.users = [];

      todo.users.push(user);

      return "";
    });

    content = content.replace(HASHTAG_REGEX, (match, hashtag) => {
      if (!todo.hashtags) todo.hashtags = [];

      todo.hashtags.push(hashtag);

      return "";
    });

    todo.content = content.trim();

    return todo;
  }
}

module.exports = {
  parse,
};
