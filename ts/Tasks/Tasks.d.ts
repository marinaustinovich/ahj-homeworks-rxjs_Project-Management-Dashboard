import Store from "../Store";
import { Project, Task } from "../types";
import "./tasks.css";
export default class Tasks {
    container: HTMLElement;
    projects: Project[];
    store: Store;
    tasksEl: HTMLElement | null;
    constructor(container: HTMLElement | null, store: Store);
    init(): void;
    start(): void;
    drawUi(): void;
    setupProjectListEvent(): void;
    createTasksElement(checkedProject: Project | undefined): HTMLElement;
    showProjectsList(): void;
    createDropdown(): HTMLElement;
    createProjectItem(project: Project): HTMLElement;
    addTask(projectId: string, task: Task): void;
    selectProject(projectId: string): void;
    doneTask(projectId: string, taskId: string): void;
    redraw(): void;
}
