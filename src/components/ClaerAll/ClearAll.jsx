// import { Context } from "../../App";
// import { useContext } from "react";
import React from "react";
import style from "./ClaerAll.module.scss";
import { useDispatch } from "react-redux";
import { clearALLActionCreator } from "../../Redux/TodosReducer";

export default function ClearAll() {
  const dispatch = useDispatch();
  // const { clearAll } = useContext(Context);
  const clear = () => {
    dispatch(clearALLActionCreator());
  };
  return (
    <div onClick={clear} className={style.clear}>
      Clear all
    </div>
  );
}
