export interface Action {
    type: string;
    payload: {
        projectId: string | null;
        taskId: string | null;
    };
}
export interface State {
    projects: Project[];
}
export interface Project {
    name: string;
    tasks: Task[];
    isCheck: boolean;
    id: string;
}
export interface Task {
    name: string;
    isDone: boolean;
    id: string;
}
