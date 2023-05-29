const ADD = "ADD";
const CLEARALL = "CLEARALL";
const DELETE = "DELETE";
const CHECKBOX = "CHECKBOX";
const SAVE = "SAVE";
const SET_TODOS = "SET_TODOS";

const intialState = [];

export const todoReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD:
      return [action.newTodo, ...state];
    case CHECKBOX:
      return state.map((el) =>
        el.id == action.id ? { ...el, isDone: !el.isDone } : el
      );
    case DELETE:
      return state.filter((el) => el.id != action.id);
    case SAVE:
      return state.map((el) =>
        el.id == action.id ? { ...el, value: action.value } : el
      );
    case CLEARALL:
      return [];
    case SET_TODOS:
      return [...action.todos];
    default:
      return state;
  }
};

export const setTodosActionCreator = (todos) => {
  return {
    type: SET_TODOS,
    todos,
  };
};

export const addActionCreator = (newTodo) => {
  return {
    type: ADD,
    newTodo,
  };
};

export const checkBoxActionCreator = (id) => {
  return {
    type: CHECKBOX,
    id,
  };
};

export const deleteActionCreator = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const saveActionCreator = (id, value) => {
  return {
    type: SAVE,
    id,
    value,
  };
};

export const clearALLActionCreator = () => {
  return {
    type: CLEARALL,
  };
};
