class ProjectBoard {
  defaultBoard;
  customBoard;
  constructor() {
    this.defaultBoard = [];
    this.customBoard = [];
  }

  getDefaultProjects() {
    return this.defaultBoard;
  }

  getCustomProjects() {
    return this.customBoard;
  }

  addDefaultProject(project) {
    this.defaultBoard.push(project);
  }

  addCustomProject(project) {
    this.customBoard.push(project);
  }

  getTodosTodayBoard() {
    const todosToday = [];
    for (let i = 0; i < this.customBoard.length; i++) {
      const temp = this.customBoard[i].getTodosToday();
      let j = 0;
      while (j < temp.length) {
        todosToday.push(temp[j]);
        j++;
      }
    }

    const todosTodayIbox = this.defaultBoard[0].getTodosToday();

    return todosToday.concat(todosTodayIbox);
  }

  getTodosWeekBoard() {
    const todosWeek = [];
    for (let i = 0; i < this.customBoard.length; i++) {
      const temp = this.customBoard[i].getTodosThisWeek();
      let j = 0;
      while (j < temp.length) {
        todosWeek.push(temp[j]);
        j++;
      }
    }

    const getTodosThisWeekInbox = this.defaultBoard[0].getTodosThisWeek();

    return todosWeek.concat(getTodosThisWeekInbox);
  }

  getProject(name) {
    return (
      this.customBoard.find((project) => project.getName() === name) ||
      this.defaultBoard.find((project) => project.getName() === name)
    );
  }

  removeProject(name) {
    this.customBoard.splice(
      this.customBoard.findIndex((project) => {
        return project.getName() === name;
      }),
      1
    );
  }
}

export default ProjectBoard;
