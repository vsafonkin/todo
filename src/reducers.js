import { combineReducers } from "redux";
import {
  LOAD_DESKS,
  LOAD_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  SET_DESK_ID,
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
      //вычисляем id новой задачи по максимальному id в массиве задач, либо ноль, если массив пуст
      const taskIds = state.tasks.map(item => item.id);
      const newId = state.tasks.length ? Math.max(...taskIds) + 1 : 0;
      return {
        ...state,
        tasks: [
          //новую задачу добавляем в начало массива
          {
            id: newId,
            status: +action.task.deskId,
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
          return item.id !== +action.id;
        })
      };
    case SET_DESK_ID:
      //находим индексы перемещаемого элемента и ближайшего к нему
      //перемещаемому элементу меняем deskId
      //удаляем перемещаемый элемент из массива и помещаем его в elem
      //вставляем elem рядом с элементом с полученным closestTaskId
      const tasks = [...state.tasks];
      let taskIndex;
      let closestTaskIndex = 0;

      tasks.forEach((item, index) => {
        if (item.id === action.taskId) {
          item.status = action.deskId;
          taskIndex = index;
        }
        if (item.id === action.closestTaskId) {
          closestTaskIndex = index;
        }
      });

      const elem = tasks.splice(taskIndex, 1)[0];

      tasks.splice(closestTaskIndex, 0, elem);
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
      const deskIds = state.desks.map(item => item.id);
      const newId = state.desks.length ? Math.max(...deskIds) + 1 : 0;
      return {
        ...state,
        desks: [
          ...state.desks,
          {
            id: newId,
            title: action.desk.title,
            color: "#b3caaf"
          }
        ]
      };
    case REMOVE_DESK:
      return {
        ...state,
        desks: state.desks.filter(item => {
          return item.id !== +action.id;
        })
      };
    case SET_DESK_COLOR:
      const desks = [...state.desks];
      desks.forEach(item => {
        if (item.id === action.deskId) {
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
