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

  init(): void {
    this.start();
    this.drawUi();
  }

  drawUi(): void {
    const statsEl = this.createStatsContainer();
    this.container.appendChild(statsEl);
  }

  createStatsContainer(): HTMLElement {
    const statsEl = document.createElement("div");
    statsEl.classList.add("stats-container");
    statsEl.innerHTML = `
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
    return statsEl;
  }

  start(): void {
    this.store.state$.pipe().subscribe({
      next: (value) => {
        const statsTableBody = document.querySelector(".stats-table-body");
        if (statsTableBody) {
          statsTableBody.innerHTML = "";
        }

        const projects = value.projects;
        projects.forEach((project) => this.addProject(project));
      },
      error: (error) => {
        console.error("An error occurred: ", error);
      },
    });
  }

  addProject(project: Project): void {
    const openedTasks = project.tasks.filter((task) => task.isDone === false);
    const projectRow = document.createElement("tr");
    projectRow.innerHTML = `
      <td data-id="${project.id}">${project.name}</td>
      <td><span class="open">${openedTasks.length}</span></td>
    `;

    document.querySelector(".stats-table-body")?.appendChild(projectRow);
  }
}
