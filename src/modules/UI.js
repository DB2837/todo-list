class UI {
  static generateTodoItem(todo) {
    const div = `
      <div class="title-container" data-description="${todo.getDescription()}">
        <input type="checkbox">
        <label for="todo"> ${todo.getTitle()}</label>
      </div>
      <div class="date-container">
        <input type="date" value="${todo.getDate()}" />
        <button class="remove-btn" data-title="${todo.getTitle()}">✖</button>
      </div>
      `;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.setAttribute.priority = `${todo.getPriority()}`;
    todoItem.innerHTML = div;

    return todoItem;
  }

  static renderTodoList(project) {
    UI.clearTodoListContainer();
    if (project === undefined) return;
    const todoList = document.querySelector(".todos-list");
    const projectName = document.querySelector("#project-name");
    projectName.innerText = project.getName();

    for (let todo of project.getTodoList()) {
      const todoItem = UI.generateTodoItem(todo);
      todoList.appendChild(todoItem);

      const removeBtn = document.querySelector(
        `[data-title="${todo.getTitle()}"]`
      );
      removeBtn.addEventListener("click", (e) => {
        UI.removeTodoItem(project, e.target.dataset.title);
      });
    }
  }

  static generateProjectItem(project) {
    const content = `
        <h3>${project.getName()}</h3>
        <button class="remove-btn" data-title="${project.getName()}">✖</button>
      `;

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = content;

    return projectItem;
  }

  static renderDefaultProjects(projecBoard) {
    const defaultProjectsContainer =
      document.querySelector(".default-projects");
    for (let project of projecBoard.getDefaultProject()) {
      const projectItem = UI.generateProjectItem(project);
      defaultProjectsContainer.appendChild(projectItem);

      projectItem.addEventListener("click", () => {
        UI.renderTodoList(project);
      });

      const removeBtn = document.querySelector(
        `[data-title="${project.getName()}"]`
      );

      removeBtn.style.display = "none";
    }
  }

  static renderCustomProjects(projecBoard) {
    UI.clearProjectContainer();
    const projectName = document.querySelector("#project-name");
    const customProjectsContainer = document.querySelector(".custom-projects");
    const todoBtn = document.querySelector("#todo-btn");
    for (let project of projecBoard.getCustomProject()) {
      const projectItem = UI.generateProjectItem(project);
      customProjectsContainer.appendChild(projectItem);

      projectItem.addEventListener("click", (e) => {
        UI.renderTodoList(project);
        todoBtn.style.display = "inline-block";
      });

      const removeBtn = document.querySelector(
        `[data-title="${project.getName()}"]`
      );

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const pNameClicked = projectName.textContent; //project title i click
        const currentPName = project.getName(); //project title in todolist section which is displayed
        UI.deleteProject(projecBoard, project);

        if (currentPName === pNameClicked) {
          UI.renderTodoList(project);
          todoBtn.style.display = "none";
        }
      });
    }
  }

  static displayAddTodoCard() {}

  static clearTodoListContainer() {
    const todoList = document.querySelector(".todos-list");
    todoList.innerHTML = "";
    const projectName = document.querySelector("#project-name");
    projectName.innerText = "";
  }

  static clearProjectContainer() {
    const customProjectsContainer = document.querySelector(".custom-projects");
    customProjectsContainer.innerHTML = "";
  }

  static removeTodoItem(project, title) {
    project.removeTodo(title);
    UI.renderTodoList(project);
  }

  static deleteProject(projectBoard, project) {
    projectBoard.removeProject(project.getName());
    project.delete();
    UI.renderCustomProjects(projectBoard);
  }
}

export default UI;
