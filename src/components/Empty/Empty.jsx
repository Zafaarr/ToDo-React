import React from "react";
import style from "./Empty.module.scss";

function EmptyList({ setTodos }) {
  if (setTodos === []) {
    return <h1 className={style.empty}>Empty</h1>;
  }
  return "";
}
export default EmptyList;
