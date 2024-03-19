import React, { useEffect } from "react";
import TodoList from "./Components/TodoList";
import InputField from "./Components/InputField";
import { fetchTodos } from "./Store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function App(props) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  return (
    <div>
      <InputField />
      {status==='loading' && <h1>Loading...</h1>}
      {error && <h1>ERROOORRR: {error}</h1>}
      <TodoList />
      <h1>HELLO I AM BACK</h1>
    </div>
  );
}

export default App;

