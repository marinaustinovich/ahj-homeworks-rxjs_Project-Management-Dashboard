import { Subject } from "rxjs";
import { scan, share, startWith } from "rxjs/operators";
import Actions from "./Actions";
import { Action, State } from "./types";

const initialState = {
  projects: [
    {
      name: "Rest Backend",
      tasks: [
        { name: "Add Rest Backend", isDone: true, id: "1" },
        { name: "Remove Rest Backend", isDone: false, id: "2" },
      ],
      isCheck: true,
      id: "1",
    },
    {
      name: "Frontend",
      tasks: [
        { name: "Add Frontend", isDone: false, id: "1" },
        { name: "Remove Frontend", isDone: false, id: "2" },
      ],
      isCheck: false,
      id: "2",
    },
    {
      name: "Android App",
      tasks: [
        { name: "Add Android App", isDone: false, id: "1" },
        { name: "Remove Android App", isDone: false, id: "2" },
        { name: "Push Notifications", isDone: false, id: "3" },
      ],
      isCheck: false,
      id: "3",
    },
    {
      name: "IOS App",
      tasks: [
        { name: "Add IOS App", isDone: false, id: "1" },
        { name: "Remove IOS App", isDone: false, id: "2" },
      ],
      isCheck: false,
      id: "4",
    },
  ],
};

export default class Store {
  actions$;
  state$;

  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: "__INITIALIZATION__" }),
      scan(
        (state, action) => this.reduce(state, action as Action),
        initialState
      ),
      share()
    );
  }

  init() {
    this.dispatch(Actions.init, { projectId: null, taskId: null });
  }

  dispatch(
    type: string,
    payload: { projectId: string | null; taskId: string | null }
  ) {
    this.actions$.next({ type, payload });
  }

  check(projectId: string, taskId: string) {
    this.dispatch(Actions.check, { projectId, taskId });
  }

  choose(projectId: string) {
    this.dispatch(Actions.choose, { projectId, taskId: null });
  }

  reduce(state: State, action: Action): State {
    switch (action.type) {
      case Actions.choose:
        return {
          ...state,
          projects: state.projects.map((project) =>
            project.id === action.payload.projectId
              ? { ...project, isCheck: true }
              : { ...project, isCheck: false }
          ),
        };
      case Actions.check:
        return {
          ...state,
          projects: state.projects.map((project) =>
            project.isCheck
              ? {
                  ...project,
                  tasks: project.tasks.map((task) =>
                    task.id === action.payload.taskId
                      ? { ...task, isDone: !task.isDone }
                      : task
                  ),
                }
              : project
          ),
        };
      case Actions.init:
        return { ...state };
      default:
        return { ...state };
    }
  }
}
