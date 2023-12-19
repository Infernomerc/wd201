const todoList = () => {
  all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date();
    // Filter items where the due date is in the past and not completed
    return all.filter((item) => new Date(item.dueDate) < today && !item.completed);
  };

  const dueToday = () => {
    const today = new Date();
    // Filter items where the due date is equal to today's date and not completed
    return all.filter((item) => {
      const dueDate = new Date(item.dueDate);
      return (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear() &&
        !item.completed
      );
    });
  };

  const dueLater = () => {
    const today = new Date();
    // Filter items where the due date is in the future and not completed
    return all.filter((item) => new Date(item.dueDate) > today && !item.completed);
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list for display
    return list
      .map((item) => {
        // Check if the item is due today
        const today = new Date();
        const dueDate = new Date(item.dueDate);

        // Format the date based on whether it's due today or later
        const formattedDate =
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
            ? ''
            : dueDate.toISOString().split('T')[0];

        // Create a displayable string for the item
        return `${item.description}${
          formattedDate !== '' ? ' - ' + formattedDate : ''
        }${item.completed ? ' - Completed' : ''}`;
      })
      .join('\n');
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")