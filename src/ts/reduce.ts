import { Action, State } from './types'; 
import Actions from './Actions';

export default function reduce(state : State, action : Action) : State {
  switch (action.type) {
    case Actions.choose:
      const checkedProject = state.projects.find((project) => project.isCheck);
      if (checkedProject) {
        checkedProject.isCheck = false;
      }

      // Найти проект с заданным id и изменить его isCheck на true
      const targetProject = state.projects.find((project) => project.id === action.payload.projectId);
      if (targetProject) {
        targetProject.isCheck = true;
      }

      return { ...state };
    case Actions.check:
      const project = state.projects.find((project) => project.isCheck);
      if (project) {
        // Найти task с заданным id и изменить его isDone на true or false
        const doneTask = project.tasks.find((project) => project.id === action.payload.taskId);
      if (doneTask) {
        doneTask.isDone ? doneTask.isDone = false : doneTask.isDone =true;
      }  
    }
      return { ...state };
    case Actions.init:
      return { ...state, };
    default:
      return state;
  }
}
