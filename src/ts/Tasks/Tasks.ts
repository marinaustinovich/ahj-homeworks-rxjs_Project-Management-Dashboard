import Store from "../Store";
import { Project, Task } from "../types";
import { fromEvent } from "rxjs";
import "./tasks.css";

export default class Tasks {
  container: HTMLElement;
  projects: Project[];
  store: Store;
  tasksEl: HTMLElement | null;

  constructor(container: HTMLElement | null, store: Store) {
    if (!container) {
      throw new Error("Container element must not be null");
    }

    this.store = store;
    this.container = container;
    this.projects = [];
    this.tasksEl = null;
  }

  init(): void {
    this.start();
    this.drawUi();
  }

  start(): void {
    this.store.state$.subscribe((state) => (this.projects = state.projects));
    this.store.init();
  }

  drawUi(): void {
    const checkedProject = this.projects.find(
      (project: Project) => project.isCheck === true
    );
    this.tasksEl = this.createTasksElement(checkedProject);
    this.setupProjectListEvent();

    this.container.appendChild(this.tasksEl);
    checkedProject?.tasks.forEach((task: Task) =>
      this.addTask(checkedProject.id, task)
    );
  }

  setupProjectListEvent(): void {
    const projectsListElement = this.tasksEl?.querySelector(".projects-list");
    if (projectsListElement) {
      fromEvent(projectsListElement, "click").subscribe(() =>
        this.showProjectsList()
      );
    }
  }

  createTasksElement(checkedProject: Project | undefined): HTMLElement {
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

  showProjectsList(): void {
    const dropdown = this.createDropdown();
    document.querySelector(".tasks")?.appendChild(dropdown);
  }

  createDropdown(): HTMLElement {
    const dropdown = document.createElement("div");
    dropdown.classList.add("tasks-dropdown");
    this.projects.forEach((project) =>
      dropdown.appendChild(this.createProjectItem(project))
    );
    fromEvent(dropdown, "click").subscribe(() => dropdown.remove());
    return dropdown;
  }

  createProjectItem(project: Project): HTMLElement {
    const projectItem = document.createElement("div");
    projectItem.classList.add("task-item");
    projectItem.textContent = project.name;
    projectItem.setAttribute("data-id", project.id);
    fromEvent(projectItem, "click").subscribe(() => {
      this.selectProject(project.id);
      projectItem.parentElement?.remove();
    });
    return projectItem;
  }

  addTask(projectId: string, task: Task): void  {
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

  selectProject(projectId: string): void {
    this.store.choose(projectId);
    this.redraw();
  }

  doneTask(projectId: string, taskId: string): void {
    this.store.check(projectId, taskId);
    this.redraw();
  }

  redraw(): void {
    const tasksContainer = this.container.querySelector(".tasks-container");
    tasksContainer?.parentElement?.removeChild(tasksContainer);

    this.drawUi();
  }
}
