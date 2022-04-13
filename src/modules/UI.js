import TodoItem from "./todo-item";
import Project from "./project-item";
import ProjectBoard from "./project-board";

class UI {
  static generateTodoItem(todo) {
    const div = `
      <div class="title-container" data-description="${todo.getDescription()}">
        <input type="checkbox">
        <label for="todo"> ${todo.getTitle()}</label>
      </div>
      <div class="date-container">
        <input type="date" name="date" value="${todo.getDate()}"/>
        <button class="remove-btn" data-title="${todo.getTitle()}">✖</button>
      </div>
      `;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
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

      todoItem.addEventListener("change", (e) => {
        if (e.target.type == "checkbox") {
          todoItem.classList.toggle("marked");
          return;
        }
        todo.setDate(e.target.value);
      });
    }
  }

  static generateProjectItem(project) {
    const content = `
        <h3>${project.getName()}</h3>
        <button class="remove-btn" data-name="${project.getName()}">✖</button>
      `;

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.classList.add(`project-${project.getName()}`);
    projectItem.innerHTML = content;

    return projectItem;
  }

  static renderDefaultProjects(projecBoard) {
    const defaultProjectsContainer =
      document.querySelector(".default-projects");

    for (let project of projecBoard.getDefaultProjects()) {
      const projectItem = UI.generateProjectItem(project);
      defaultProjectsContainer.appendChild(projectItem);

      projectItem.addEventListener("click", () => {
        if (project.getName() === "Today") {
          UI.addTodosToday(projecBoard, project);
        } else if (project.getName() === "ThisWeek") {
          UI.addTodosWeek(projecBoard, project);
        }

        UI.renderTodoList(project);
        const addTodo = document.querySelector("#todo-btn");
        addTodo.style.display = "none";

        if (project.getName() === "Inbox") {
          addTodo.style.display = "inline-block";
        }

        const removeTodoBtn = document.querySelectorAll("[data-title]");
        for (let button of removeTodoBtn) {
          button.style.display = "none";
        }
      });

      const removeBtn = document.querySelector(
        `[data-name="${project.getName()}"]`
      );

      removeBtn.style.display = "none";
    }
  }

  static renderCustomProjects(projecBoard) {
    UI.clearProjectContainer();
    const projectName = document.querySelector("#project-name");
    const customProjectsContainer = document.querySelector(".custom-projects");
    const todoBtn = document.querySelector("#todo-btn");
    for (let project of projecBoard.getCustomProjects()) {
      const projectItem = UI.generateProjectItem(project);
      customProjectsContainer.appendChild(projectItem);

      projectItem.addEventListener("click", (e) => {
        UI.renderTodoList(project);
        todoBtn.style.display = "inline-block";
      });

      const removeBtn = document.querySelector(
        `[data-name="${project.getName()}"]`
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

  static addProjectToBoard(projecBoard) {
    const name = document.getElementById("name").value;
    if (name === "") return;
    if (projecBoard.getProject(name)) {
      window.alert(
        "choose another name, there is already a project with this name."
      );
      return;
    }
    const project = new Project(name);

    projecBoard.addCustomProject(project);
    UI.renderCustomProjects(projecBoard);
  }

  static clearInputsProjectCard() {
    const title = (document.getElementById("name").value = "");
  }

  static addTodoToProject(projecBoard, projectName) {
    if (projectName === "") return;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priority = "low";
    if (title === "") return;
    if (projecBoard.getProject(projectName).getTodo(title)) {
      window.alert(
        "choose another name, there is already a Todo with this name."
      );
      return;
    }
    const todo = new TodoItem(title, description, date, priority);

    const project = projecBoard.getProject(projectName);
    project.addTodo(todo);
    UI.renderTodoList(project);
  }

  static addTodosToday(projecBoard, project) {
    project.delete();
    const todosToday = projecBoard.getTodosTodayBoard();
    for (let i = 0; i < todosToday.length; i++) {
      project.addTodo(todosToday[i]);
    }
  }

  static addTodosWeek(projecBoard, project) {
    project.delete();
    const todosToday = projecBoard.getTodosWeekBoard();
    for (let i = 0; i < todosToday.length; i++) {
      project.addTodo(todosToday[i]);
    }
  }

  static clearInputsTodoCard() {
    const title = (document.getElementById("title").value = "");
    const description = (document.getElementById("description").value = "");
    const date = (document.getElementById("date").value = "");
  }

  static clearTodoListContainer() {
    const todoList = document.querySelector(".todos-list");
    todoList.innerHTML = "";
    const projectName = document.querySelector("#project-name");
    projectName.innerText = "";
  }

  static clearDefaultProjectContaienr() {
    const customProjectsContainer = document.querySelector(".default-projects");
    customProjectsContainer.innerHTML = "";
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
    project.setName("");
    UI.renderCustomProjects(projectBoard);
  }
}

export default UI;
