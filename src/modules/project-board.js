class ProjectBoard {
  #defaultBoard;
  #customBoard;
  constructor() {
    this.#defaultBoard = [];
    this.#customBoard = [];
  }

  getDefaultProjects() {
    return this.#defaultBoard;
  }

  getCustomProjects() {
    return this.#customBoard;
  }

  addDefaultProject(project) {
    this.#defaultBoard.push(project);
  }

  addCustomProject(project) {
    this.#customBoard.push(project);
  }

  getTodosTodayBoard() {
    const todosToday = [];
    for (let i = 0; i < this.#customBoard.length; i++) {
      const temp = this.#customBoard[i].getTodosToday();
      let j = 0;
      while (j < temp.length) {
        todosToday.push(temp[j]);
        j++;
      }
    }

    return todosToday;
  }

  getProject(name) {
    return (
      this.#customBoard.find((project) => project.getName() === name) ||
      this.#defaultBoard.find((project) => project.getName() === name)
    );
  }

  removeProject(name) {
    this.#customBoard.splice(
      this.#customBoard.findIndex((project) => {
        return project.getName() === name;
      }),
      1
    );
  }
}

export default ProjectBoard;
