class Project {
  #name;
  #todoList;
  constructor(name) {
    this.#todoList = [];
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getTodoList() {
    return this.#todoList;
  }

  addTodo(todoItem) {
    this.#todoList.push(todoItem);
  }

  removeTodo(title) {
    this.#todoList.splice(
      this.#todoList.findIndex((todoItem) => {
        return todoItem.getTitle() === title;
      }),
      1
    );
  }
}

export default Project;
