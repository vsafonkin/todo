import { combineReducers } from "redux";
import {
  LOAD_DESKS,
  LOAD_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  SET_STATUS,
  SET_DESK_COLOR,
  ADD_DESK,
  REMOVE_DESK
} from "./actions.js";

const initialStateTask = {
  tasks: []
};

const initialStateDesk = {
  desks: []
};

function taskReducer(state = initialStateTask, action) {
  switch (action.type) {
    case LOAD_TASKS:
      return { ...state, tasks: action.tasks };
    case ADD_TASK:
      const new_id = state.tasks.length ? state.tasks[0].id + 1 : 0; //вычисляем id новой задачи по id последней добавленной
      return {
        ...state,
        tasks: [
          //новую задачу добавляем в начало массива
          {
            id: new_id,
            status: action.task.desk_id,
            title: action.task.title,
            description: action.task.description
          },
          ...state.tasks
        ]
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => {
          return item.id != action.id;
        })
      };
    case SET_STATUS:
      const tasks = [...state.tasks];
      tasks.forEach(item => {
        if (item.id === action.task_id) {
          item.status = action.status;
        }
      });
      return { ...state, tasks };
    default:
      return state;
  }
}

function deskReducer(state = initialStateDesk, action) {
  switch (action.type) {
    case LOAD_DESKS:
      return { ...state, desks: action.desks };
    case ADD_DESK:
      const new_id = state.desks.length
        ? state.desks[state.desks.length - 1].id + 1
        : 0;
      return {
        ...state,
        desks: [
          ...state.desks,
          {
            id: new_id,
            title: action.desk.title,
            color: "#b3caaf"
          }
        ]
      };
    case REMOVE_DESK:
      return {
        ...state,
        desks: state.desks.filter(item => {
          return item.id != action.id;
        })
      };
    case SET_DESK_COLOR:
      const desks = [...state.desks];
      desks.forEach(item => {
        if (item.id === action.desk_id) {
          item.color = action.color;
        }
      });
      return { ...state, desks };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  desks: deskReducer
});

export default rootReducer;
