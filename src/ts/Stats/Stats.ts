import Store from "../Store";
import { Project } from "../types";
import "./stats.css";

export default class Stats {
  container: HTMLElement;
  store: Store;

  constructor(container: HTMLElement | null, store: Store) {
    if (!container) {
      throw new Error("Container element must not be null");
    }

    this.store = store;
    this.container = container;
  }

  init() {
    this.start();
    this.drawUi();
  }

  drawUi() {
    const statssEl = document.createElement("div");
    statssEl.classList.add("stats-container");
    statssEl.innerHTML = `
      <h2>Stats</h2>
      <div class="stats">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody class="stats-table-body"></tbody>
        </table>
      </div>
    `;

    this.container.appendChild(statssEl);
  }

  start() {
    this.store.state$.pipe().subscribe((value) => {
      const statsTableBody = document.querySelector(".stats-table-body");
      if (statsTableBody) {
        statsTableBody.innerHTML = "";
      }

      const projects = value.projects;
      projects.forEach((project) => this.addProject(project));
    });
  }

  addProject(project: Project) {
    const openedTasks = project.tasks.filter((task) => task.isDone === false);
    const projectRow = document.createElement("tr");
    projectRow.innerHTML = `
      <td data-id="${project.id}">${project.name}</td>
      <td><span class="open">${openedTasks.length}</span></td>
    `;

    document.querySelector(".stats-table-body")?.appendChild(projectRow);
  }
}
