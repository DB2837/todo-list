import TodoItem from "./todo-item";
import Project from "./project-item";
import ProjectBoard from "./project-board";
import UI from "./UI";

function startApp() {
  const Pcontainer = new ProjectBoard();

  const inbox = new Project("Inbox");
  const today = new Project("Today");
  const thisWeek = new Project("ThisWeek");

  Pcontainer.addDefaultProject(inbox);
  Pcontainer.addDefaultProject(today);
  Pcontainer.addDefaultProject(thisWeek);

  /* localStorage.setItem("projectBoard", JSON.stringify(Pcontainer));
const storage = JSON.parse(localStorage.getItem("projectBoard")); */

  UI.renderCustomProjects(Pcontainer);
  UI.renderDefaultProjects(Pcontainer);

  const addTodo = document.querySelector("#todo-btn");
  const addTodoCard = document.querySelector(".addTodo-card");
  const cancelAddTodo = document.querySelector("#addToProject-cancel");
  cancelAddTodo.addEventListener("click", (e) => {
    e.preventDefault();
    UI.clearInputsTodoCard();
    addTodoCard.classList.toggle("displayNone");
  });

  addTodo.addEventListener("click", () => {
    addTodoCard.classList.toggle("displayNone");
  });

  const addToProject = document.querySelector("#addToProject");
  addToProject.addEventListener("click", (e) => {
    e.preventDefault();
    const projectName = document.getElementById("project-name").textContent;

    UI.addTodoToProject(Pcontainer, projectName);
    UI.clearInputsTodoCard();
    localStorage.setItem("projectBoard", JSON.stringify(Pcontainer));

    addTodoCard.classList.toggle("displayNone");
  });

  const projectBtn = document.querySelector("#project-btn");
  const addToBoard = document.querySelector("#addToBoard");
  const cancelAddBoard = document.querySelector("#addToBoard-cancel");
  const addProjectCard = document.querySelector(".addProject-card");

  projectBtn.addEventListener("click", () => {
    addProjectCard.classList.toggle("displayNone");
  });

  cancelAddBoard.addEventListener("click", (e) => {
    e.preventDefault();
    UI.clearInputsProjectCard();
    addProjectCard.classList.toggle("displayNone");
  });

  addToBoard.addEventListener("click", (e) => {
    e.preventDefault();

    UI.addProjectToBoard(Pcontainer);
    UI.clearInputsProjectCard();
    localStorage.setItem("projectBoard", JSON.stringify(Pcontainer));
    const storage = JSON.parse(localStorage.getItem("projectBoard"));
    console.log(storage.customBoard);

    addProjectCard.classList.toggle("displayNone");
  });

  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.addEventListener("click", () => {
    addTodoCard.classList.add("displayNone");
  });
}

export default startApp;
