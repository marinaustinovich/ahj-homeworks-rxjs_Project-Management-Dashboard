import { Subject } from "rxjs";
import { Action, State } from "./types";
export default class Store {
    actions$: Subject<unknown>;
    state$: import("rxjs").Observable<{
        projects: {
            name: string;
            tasks: {
                name: string;
                isDone: boolean;
                id: string;
            }[];
            isCheck: boolean;
            id: string;
        }[];
    }>;
    constructor();
    init(): void;
    dispatch(type: string, payload: {
        projectId: string | null;
        taskId: string | null;
    }): void;
    check(projectId: string, taskId: string): void;
    choose(projectId: string): void;
    reduce(state: State, action: Action): State;
}
