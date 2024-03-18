import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoFetch, toggleStatus } from "../Store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        onClick={() => dispatch(toggleStatus(id))}
        type="checkbox"
        checked={completed}
      />
      <span style={{ textDecoration: completed && "line-through" }}>
        {title}
      </span>
      <span
        onClick={() => dispatch(deleteTodoFetch(id))}
        style={{ color: "red", cursor: "pointer", fontSize: "30px" }}
      >
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
