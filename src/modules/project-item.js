class Project {
  name;
  todoList;
  constructor(name) {
    this.todoList = [];
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getTodoList() {
    return this.todoList;
  }

  getTodosToday() {
    const date = new Date();
    const todosToday = [];
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].getDate() == date.toISOString().split("T")[0]) {
        todosToday.push(this.todoList[i]);
      }
    }
    return todosToday;
  }

  getTodosThisWeek() {
    const currentdate = new Date();
    const weekDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const todosWeek = [];
    for (let i = 0; i < this.todoList.length; i++) {
      if (
        this.todoList[i].getDate() >= currentdate.toISOString().split("T")[0] &&
        this.todoList[i].getDate() <= weekDate.toISOString().split("T")[0]
      ) {
        todosWeek.push(this.todoList[i]);
      }
    }
    return todosWeek;
  }

  addTodo(todoItem) {
    this.todoList.push(todoItem);
  }

  getTodo(title) {
    return this.todoList.find((todo) => todo.getTitle() === title);
  }

  removeTodo(title) {
    this.todoList.splice(
      this.todoList.findIndex((todoItem) => {
        return todoItem.getTitle() === title;
      }),
      1
    );
  }

  delete() {
    this.todoList = [];
  }
}

export default Project;
