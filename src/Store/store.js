import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})

const afon = 'afon'

export default store;