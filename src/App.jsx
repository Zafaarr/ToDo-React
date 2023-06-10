import { createContext, useEffect, useState } from "react";
import "./abc_module.scss";
import sea from "./sea.mp4";
import React from "react";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";
// import ClearAll from "./components/ClaerAll/ClearAll";
import TodoList from "./components/TodoList/TodoList";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setTodosActionCreator } from "./Redux/TodosReducer";
import { todosServices } from "./API/todosServices";
import { useQuery } from "react-query";
export const Context = createContext();

// const BEZ_URL = "https://6467044d2ea3cae8dc23b733.mockapi.io/api/todos";

export function App() {
  //  USE
  // const todos = useSelector((state) => state.todos);
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [count, setCount] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  // const dispatch = useDispatch();

  const { data, isError, isSuccess, isLoading, error } = useQuery(
    "getTodos",
    () => {
      todosServices.get().then((response) => setTodos(response.data));
    }
  );

  let arr = [];

  let lastIndex = currentPage * count;
  let firstIndex = lastIndex - count;

  const filteredPages = (el = [todos]) => {
    let pageNumbers = todos.length === 0 ? 1 : Math.ceil(el.length / count);
    for (let i = 1; i <= pageNumbers; i++) {
      arr.push(i);
    }
    return el.slice((currentPage - 1) * count, currentPage * count);
  };

  const filterByStatus = (todos, status) => {
    switch (status) {
      case "complited":
        return todos.filter((e) => e.isDone);
      case "process":
        return todos.filter((e) => !e.isDone);
      default:
        return todos;
    }
  };

  // const clearAll = () => {
  //   // setTodos([]);
  // };

  const tasksPerPage = (el) => {
    if (el.target.value === "") {
      alert("Please use cursor");
      setCount(4);
    } else {
      setCount(el.target.value);
    }
  };

  const clickedPage = (item) => {
    setCurrentPage(item);
  };

  filteredPages(todos);

  // useEffect(() => {
  //   todosServices.get().then((response) => {
  //     dispatch(setTodosActionCreator(response.data.reverse()));
  //     // setTodos(response.data);
  //   });
  // }, []);

  return (
    <Context.Provider
      value={{
        // clearAll,
        setTodos,
        todos,
        filterByStatus,
        filteredPages,
        status,
        firstIndex,
      }}
    >
      <div className="wrapper">
        <video autoPlay loop muted className="myVideo">
          <source src={sea} type="video/mp4" />
        </video>
        <div className="container">
          <Title text="To Do list APP" />
          <div className="block">
            <Form />
            <div className="filter">
              Filterd by status:
              <select
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="filter_status"
              >
                <option value="all">All</option>
                <option value="complited">Complited</option>
                <option value="process">Process</option>
              </select>
            </div>
            {todos.length == 0 ? <h1 className="empty">Empty</h1> : ""}
            <TodoList />
            <div className="pagination">
              <div>
                <input
                  value={count}
                  onChange={tasksPerPage}
                  type="number"
                  name="count"
                  className="count"
                />
              </div>
              <div className="pages">
                {arr.map((item) => (
                  <span
                    onClick={() => {
                      clickedPage(item);
                    }}
                    key={item}
                    className="page"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div onClick={() => setTodos([])} className="clear">
              Clear all
            </div>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
