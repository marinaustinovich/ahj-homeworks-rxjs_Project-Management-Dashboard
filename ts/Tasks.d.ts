import Store from "./Store";
import { Project, Task } from './types';
export default class Tasks {
    container: HTMLElement;
    projects: Project[];
    store: Store;
    constructor(container: HTMLElement | null, store: Store);
    start(): void;
    drawUi(): void;
    createTasksElement(checkedProject: Project | undefined): HTMLDivElement;
    showProjectsList(): void;
    createDropdown(): HTMLDivElement;
    addTask(projectId: string, task: Task): void;
    selectProject(projectId: string): void;
    doneTask(projectId: string, taskId: string): void;
    redraw(): void;
}
