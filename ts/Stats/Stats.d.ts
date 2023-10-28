import Store from "../Store";
import { Project } from "../types";
import "./stats.css";
export default class Stats {
    container: HTMLElement;
    store: Store;
    constructor(container: HTMLElement | null, store: Store);
    init(): void;
    drawUi(): void;
    createStatsContainer(): HTMLElement;
    start(): void;
    addProject(project: Project): void;
}
