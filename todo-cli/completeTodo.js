// completeTodo.js
const argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");

const completeTodo = async (taskId) => {
  try {
    await db.Todo.markAsComplete(taskId);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;

  if (!id) {
    throw new Error("Please provide an id");
  }

  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    throw new Error("The id must be an integer");
  }

  await completeTodo(taskId);
  await db.Todo.showList();
})();
