const {
  addTodo,
  listTodos,
  markDone,
  deleteTodo
} = require("./todos");

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
  case "add":
    addTodo(value);
    break;

  case "list":
    listTodos();
    break;

  case "done":
    markDone(value);
    break;

  case "delete":
    deleteTodo(value);
    break;

  default:
    console.log(`
📌 Commands:
node app.js add "Task"
node app.js list
node app.js done <id>
node app.js delete <id>
    `);
}
