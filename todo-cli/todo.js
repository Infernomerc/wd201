
const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(item => item.dueDate < today);
  }

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(item =>item.dueDate === today);
  }

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(item =>  item.dueDate > today);
  }

  const todisplayList = (todoList ) => {
    let displayList = "";
    todoList .forEach(item => {
      const status = item.completed ? "[x]" : "[ ]";
      const title = item.title;
      const dueDate = item.dueDate === today ? "" : ` ${item.dueDate}`;
      displayList += `${status} ${title}${dueDate}\n`;
    });
    return displayList;
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    todisplayList
  };
};

module.exports=todoList;