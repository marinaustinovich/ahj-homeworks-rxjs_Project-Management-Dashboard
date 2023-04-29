import Store from "./Store";
import { Project } from './types';
export default class Stats {
    container: HTMLElement;
    store: Store;
    constructor(container: HTMLElement | null, store: Store);
    drawUi(): void;
    start(): void;
    addProject(project: Project): void;
}
