export const LOAD_TASKS = "LOAD_TASKS";
export const LOAD_DESKS = "LOAD_DESKS";
export const ADD_TASK = "ADD_TASK";
export const ADD_DESK = "ADD_DESK";
export const REMOVE_TASK = "REMOVE_TASK";
export const REMOVE_DESK = "REMOVE_DESK";
export const SET_DESK_ID = "SET_DESK_ID";
export const SET_DESK_COLOR = "SET_DESK_COLOR";

export function loadDesks(data) {
  return {
    type: LOAD_DESKS,
    desks: data
  };
}

export function addDesk(data) {
  return {
    type: ADD_DESK,
    desk: data
  };
}

export function removeDesk(id) {
  return {
    type: REMOVE_DESK,
    id: id
  };
}

export function loadTasks(data) {
  return {
    type: LOAD_TASKS,
    tasks: data
  };
}

export function addTask(data) {
  return {
    type: ADD_TASK,
    task: data
  };
}

export function removeTask(id) {
  return {
    type: REMOVE_TASK,
    id: id
  };
}

export function setDeskId(taskId, deskId, closestTaskId) {
  return {
    type: SET_DESK_ID,
    taskId: taskId,
    deskId: deskId,
    closestTaskId: closestTaskId
  };
}

export function setDeskColor(desk_id, color) {
  return {
    type: SET_DESK_COLOR,
    desk_id: desk_id,
    color: color
  };
}
