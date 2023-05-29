import React, { useContext } from "react";
import { Context } from "../../App";
import TodoItem from "../ToDoItem/TodoItem";
import style from "./TodoList.module.scss";
// import { useSelector } from "react-redux";

export default function TodoList() {
  // const todos = useSelector((state) => state.todos);

  const { todos, filterByStatus, filteredPages, status, firstIndex } =
    useContext(Context);

  return (
    <ul className={style.todosList}>
      {filteredPages(filterByStatus(todos, status)).map((item, index) => (
        <TodoItem
          // setTodos={setTodos}
          key={item.id}
          item={item}
          index={index}
          firstIndex={firstIndex}
        />
      ))}
    </ul>
  );
}
