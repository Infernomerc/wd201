// listTodos.js
const db = require("./models/index");

const displayTodoList = async () => {
  try {
    await db.Todo.showList();
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await displayTodoList();
})();
