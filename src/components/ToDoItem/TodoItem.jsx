import { memo, useRef, useState } from "react";
import style from "./TodoItem.module.scss";
// import { useDispatch } from "react-redux";
// import {
//   checkBoxActionCreator,
//   deleteActionCreator,
//   saveActionCreator,
//   setTodosActionCreator,
// } from "../../Redux/TodosReducer";
import "boxicons";
import { useMutation } from "react-query";
// import axios from "axios";
import { todosServices } from "../../API/todosServices";
import { checkBoxActionCreator } from "../../Redux/TodosReducer";
import { useDispatch } from "react-redux";

// const BEZ_URL = "https://6467044d2ea3cae8dc23b733.mockapi.io/api/todos";

function TodoItem({ setTodos, item, index, firstIndex }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(item.value);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputElement = useRef();

  const editHandle = (id) => {
    // axios.get(BEZ_URL + "/" + id).then((response) => {
    //   dispatch(setTodosActionCreator(response.data));
    // });
    setIsDisabled((old) => !old);
    inputElement.current.disabled = false;
    inputElement.current.focus();
  };

  const saveHandle = useMutation(todosServices.update, {
    onSuccess: ({ value }) => {
      setIsDisabled(true);
      inputElement.current.disabled = true;
      setValue(value);
    },
  });

  // const saveHandle = (id) => {
  //   // todosServices
  //   //   .update(id, { value: value })
  //   //   .then((response) => {
  //   //     console.log(response.data);
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   // dispatch(saveActionCreator(id, value));
  //   setIsDisabled(true);
  //   inputElement.current.disabled = true;
  //   // setTodos((el) => (el.id === id ? { ...el, value } : el));
  // };

  const cancelHandle = () => {
    setIsDisabled(true);
    setValue(item.value);
    inputElement.current.disabled = true;
  };

  const deletePost = useMutation((id) => {
    return todosServices.delete(id);
  });
  // const deleteHandle = (id) => {
  // todosServices.delete(id).then(() => {
  //   todosServices.get().then((response) => {
  //     dispatch(setTodosActionCreator(response.data.reverse()));
  //   });
  // });
  // dispatch(deleteActionCreator(id));
  // setTodos((old) => {
  //   return old.filter((el) => el.id !== id);
  // });
  // };

  const checkBoxHandle = (id) => {
    // setTodos((old) => {
    //   return old.map((el) =>
    //     el.id === id ? { ...el, isDone: !el.isDone } : el
    //   );
    // });
    console.log(id);
    dispatch(checkBoxActionCreator(id));
  }; // checkBoxni vslusini o`zgartirish uchun

  return (
    <div className={style.todoItem}>
      <div className={style.order}>{firstIndex + ++index}</div>
      <li className={style.todo} key={item.id}>
        <input
          readOnly
          onClick={() => checkBoxHandle(item.id)}
          checked={item.isDone}
          className={style.checkbox}
          type="checkbox"
        />
        <input
          disabled
          ref={inputElement}
          value={value}
          type="text"
          onChange={(e) => setValue(e.target.value)} // inputni control qsa boladi
          className={style.todo_input}
        />
        {!isDisabled ? (
          <>
            <div
              onClick={() => saveHandle.mutate(item.id, item.value)}
              className={style.save}
            >
              <box-icon name="save"></box-icon>
            </div>
            <div onClick={cancelHandle} className={style.cancel}>
              <box-icon size="md" name="x"></box-icon>{" "}
            </div>
          </>
        ) : (
          <div onClick={() => editHandle(item.id)} className={style.edit}>
            <box-icon name="pencil"></box-icon>
          </div>
        )}
        <div
          onClick={() => deletePost.mutate(item.id)}
          className={style.delete}
        >
          <box-icon name="trash"></box-icon>
        </div>
      </li>
    </div>
  );
}

export default memo(TodoItem);
