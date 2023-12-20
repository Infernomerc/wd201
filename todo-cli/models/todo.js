// models/todo.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      let overdueTasks = await Todo.overdue();
      console.log(overdueTasks.map((item) => item.displayableString()).join('\n'));
      console.log("\n");

      console.log("Due Today");
      let todayTasks = await Todo.dueToday();
      console.log(todayTasks.map((item) => item.displayableString()).join('\n'));
      console.log("\n");

      console.log("Due Later");
      let laterTasks = await Todo.dueLater();
      console.log(laterTasks.map((item) => item.displayableString()).join('\n'));
    }

    static today = new Date().toISOString().split("T")[0];

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.lt]: Todo.today
          }
        }
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: Todo.today
        }
      });
    }

    static async dueLater() {
      let tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.gte]: tomorrow
          }
        }
      });
    }

    static async markAsComplete(id) {
      const item = await Todo.findByPk(id);

      if (item) {
        item.completed = true;
        await item.save();
      } else {
        console.log("Item not Found !");
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";

      const checkToday = (date, today) => {
        let dateArr = String(date).split("-");
        let todayArr = String(today).split("-");

        for (let i = 0; i < 8; i++) {
          if (dateArr[i] != todayArr[i]) {
            return false;
          }
        }
        return true;
      }

      if (checkToday(this.dueDate, Todo.today)) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
