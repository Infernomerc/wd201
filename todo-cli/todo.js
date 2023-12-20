/* eslint-disable no-undef */
const todoList = () => {
  all = []
  const add = (todoItem) => {
      all.push(todoItem)
  }
  const markAsComplete = (index) => {
      all[index].completed = true
  }

  const overdue = () => {
     
      const overdueList = [];
      const currentDate = new Date().toISOString().slice(0, 10);

      for (let i = 0; i < all.length; i++) {
          if (all[i].dueDate < currentDate) {
              overdueList.push(all[i]);
          }
      }

      return overdueList;

  }

  const dueToday = () => {
     
      const currentDate = new Date().toISOString().split("T")[0];
      return all.filter((item) => item.dueDate === currentDate);

  }

  const dueLater = () => {
      
      const futureDueDates = [];
      const currentDate = new Date().toISOString().slice(0, 10);

      for (let i = 0; i < all.length; i++) {
          if (all[i].dueDate > currentDate) {
             futureDueDates.push(all[i]);
          }
      }

      return futureDueDates;

  }

  const toDisplayableList = (list) => {
     
      return list
          .map((task) => {
              let checkbox = task.completed ? "[x]" : "[ ]";
              const formattedDate =
                  task.dueDate !== new Date().toISOString().split("T")[0]
                      ? " " + task.dueDate
                      : "";
              return `${checkbox} ${task.title}${formattedDate}`;
          })
          .join("\n");

  }

  return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
  };
};


module.exports = todoList();