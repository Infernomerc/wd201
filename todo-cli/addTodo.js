// addTodo.js
// eslint-disable-next-line no-undef
const argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");

const createTodo = async (params) => {
  try {
    await db.Todo.addTask(params);
  } catch (error) {
    console.error(error);
  }
};

const calculateDueDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Please provide an integer value for days");
  }

  const today = new Date();
  const oneDayInMilliseconds = 60 * 60 * 24 * 1000;
  const dueDate = new Date(today.getTime() + days * oneDayInMilliseconds);
  
  return dueDate.toISOString().split("T")[0];
};

(async () => {
  const { title, dueInDays } = argv;

  if (!title || dueInDays === undefined) {
    throw new Error(
      'Both title and dueInDays are required.\nSample command: node addTodo.js --title="Buy milk" --dueInDays=-2'
    );
  }

  const dueDate = calculateDueDate(dueInDays);

  await createTodo({
    title,
    dueDate,
    completed: false
  });

  await db.Todo.showList();
})();
