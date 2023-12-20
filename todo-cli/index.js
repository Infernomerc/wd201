/* eslint-disable no-unused-vars */
// index.js

const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect();
    
    // Corrected the syntax for creating a new Todo
    const todo = await Todo.create({
      title: "Second Item",
      dueDate: new Date(),
      completed: false,
    });

    console.log(`Created todo with ID: ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};
const countItems = async () => {
    try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} items in the table!`);
    } catch (error) {
    console.error(error);
    }
    }
// Calling the createTodo function inside an async IIFE
(async () => {
  //await createTodo();
  await countItems
})();
