class ProjectBoard {
  #defaultBoard;
  #customBoard;
  constructor() {
    this.#defaultBoard = [];
    this.#customBoard = [];
  }

  getDefaultProject() {
    return this.#defaultBoard;
  }

  getCustomProject() {
    return this.#customBoard;
  }

  addDefaultProject(project) {
    this.#defaultBoard.push(project);
  }

  addCustomProject(project) {
    this.#customBoard.push(project);
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
