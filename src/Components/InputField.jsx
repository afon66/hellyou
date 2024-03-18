import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../Store/todoSlice";

const InputField = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const addText = (e) => {
    setText(e.target.value);
  };

  const handleAddTodos = () => {
    if (text.trim()) {
      dispatch(addNewTodo(text));
    }
    setText("");
  };

  return (
    <label>
      <input type="text" value={text} onChange={addText} />
      <button onClick={handleAddTodos} type="button">
        Add
      </button>
    </label>
  );
};

export default InputField;
