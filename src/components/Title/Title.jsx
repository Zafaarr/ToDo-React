import { memo } from "react";
import style from "./Title.module.scss";

function Title({ text }) {
  return <div className={style.title}>{text}</div>;
}
export default memo(Title);
