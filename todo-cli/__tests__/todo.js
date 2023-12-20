/* eslint-disable no-undef */
const todoList = require("../todo");

const todos = todoList;

describe("todo list test suite", () => {
    beforeAll(() => {
        todos.add({
            title: "Test Todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        });
    });
    test("Should add new Todo", () => {
        const todoItemsCount = todos.all.length;
        todos.add({
            title: "Test Todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        });
        expect(todos.all.length).toBe(todoItemsCount + 1);
    });
    test("todo as complete", () => {
        expect(todos.all[0].completed).toBe(false);
        todos.markAsComplete(0);
        expect(todos.all[0].completed).toBe(true);
    });
    test("list of overdue todos", () => {
        const l = todos.overdue().length;
        todos.add({
            title: "Overdue Todo",
            completed: false,
            dueDate: new Date(
                new Date().setDate(new Date().getDate() - 1),
            ).toISOString().slice(0, 10),
        });
        expect(todos.overdue().length).toBe(l + 1);
    });

    test("list of todos due today", () => {
        const l = todos.dueToday().length;
        todos.add({
            title: "dueToday Todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        });
        expect(todos.dueToday().length).toBe(l + 1);
    });

    test("list of todos due later", () => {
        const l = todos.dueLater.length;
        todos.add({
            title: "UnderDue Todo",
            completed: false,
            dueDate: new Date(
                new Date().setDate(new Date().getDate() + 1),
            ).toISOString().slice(0, 10),
        });
        expect(todos.dueLater().length).toBe(l +1);
});
});
