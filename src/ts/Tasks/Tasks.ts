import Store from "../Store";
import { Project, Task } from "../types";
import { fromEvent } from "rxjs";
import "./tasks.css";

export default class Tasks {
  container: HTMLElement;
  projects: Project[];
  store: Store;

  constructor(container: HTMLElement | null, store: Store) {
    if (!container) {
      throw new Error("Container element must not be null");
    }

    this.store = store;
    this.container = container;
    this.projects = [];
  }

  init() {
    this.start();
    this.drawUi();
  }

  start() {
    this.store.state$.subscribe((state) => (this.projects = state.projects));
    this.store.init();
  }

  drawUi() {
    const checkedProject = this.projects.find(
      (project: Project) => project.isCheck === true
    );
    const tasksEl = this.createTasksElement(checkedProject);

    const projectsListElement = tasksEl.querySelector(".projects-list");
    if (projectsListElement) {
      fromEvent(projectsListElement, "click").subscribe(() =>
        this.showProjectsList()
      );
    }

    this.container.appendChild(tasksEl);
    checkedProject?.tasks.forEach((task: Task) =>
      this.addTask(checkedProject.id, task)
    );
  }

  createTasksElement(checkedProject: Project | undefined) {
    const tasksEl = document.createElement("div");
    tasksEl.classList.add("tasks-container");
    tasksEl.innerHTML = `
      <h2>Tasks</h2>
      <div class="tasks">
        <table>
          <thead>
            <tr>
              <th class="projects-list" column="3" data-id="${checkedProject?.id}">Project: <span class="chosen-project">${checkedProject?.name}</span></th>
              <th ></th>
            </tr>
          </thead>
          <tbody class="tasks-table-body"></tbody>
        </table>
      </div>
    `;
    return tasksEl;
  }

  showProjectsList() {
    const dropdown = this.createDropdown();
    document.querySelector(".tasks")?.appendChild(dropdown);
  }

  createDropdown() {
    const dropdown = document.createElement("div");
    dropdown.classList.add("tasks-dropdown");

    this.projects.forEach((project) => {
      const projectItem = document.createElement("div");
      projectItem.classList.add("task-item");
      projectItem.textContent = project.name;
      projectItem.setAttribute("data-id", project.id);

      fromEvent(projectItem, "click").subscribe(() => {
        this.selectProject(project.id);
        dropdown.parentElement?.removeChild(dropdown);
      });

      dropdown.appendChild(projectItem);
    });

    fromEvent(dropdown, "click").subscribe(() => {
      dropdown.parentElement?.removeChild(dropdown);
    });
    return dropdown;
  }

  addTask(projectId: string, task: Task) {
    const projectRow = document.createElement("tr");
    projectRow.innerHTML = `
      <td><span class="done-task">${task.isDone ? "&#10004;" : ""}</span></td>
      <td data-id="${task.id}">${task.name}</td>
    `;

    const doneEl = projectRow.querySelector(".done-task");
    if (doneEl) {
      fromEvent(doneEl, "click").subscribe(() => {
        this.doneTask(projectId, task.id);
      });
    }

    document.querySelector(".tasks-table-body")?.appendChild(projectRow);
  }

  selectProject(projectId: string) {
    this.store.choose(projectId);
    this.redraw();
  }

  doneTask(projectId: string, taskId: string) {
    this.store.check(projectId, taskId);
    this.redraw();
  }

  redraw() {
    const tasksContainer = this.container.querySelector(".tasks-container");
    tasksContainer?.parentElement?.removeChild(tasksContainer);

    this.drawUi();
  }
}
