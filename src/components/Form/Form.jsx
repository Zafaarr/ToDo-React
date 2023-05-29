// import { useDispatch } from "react-redux";
import style from "./Form.module.scss";
import React from "react";
// import { setTodosActionCreator } from "../../Redux/TodosReducer";
import { todosServices } from "../../API/todosServices";
import { useMutation, useQueryClient } from "react-query";
// import axios from "axios";

// const BEZ_URL = "https://6467044d2ea3cae8dc23b733.mockapi.io/api/todos";

const HandleSubmit = () => {
  // const { setTodos } = props;
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const mutation = useMutation(todosServices.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("getTodos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target["todo"];
    if (inputValue.value) {
      const newTodo = {
        value: inputValue.value,
        isDone: false,
        id: "a" + Date.now(),
      };
      mutation.mutate(newTodo);
      // setTodos((old) => [newTodo, ...old]);
      // dispatch(addActionCreator(newTodo));
      // todosServices.create(newTodo).then((response) => {
      //   todosServices.get().then((response) => {
      //     dispatch(setTodosActionCreator(response.data.reverse()));
      //   });
      // });
      inputValue.value = "";
    } else {
      alert("Please enter a new Task!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input name="todo" placeholder="Text input" className={style.input} />
      <button type="submit" className={style.add}>
        Add
      </button>
    </form>
  );
};

export default HandleSubmit;
