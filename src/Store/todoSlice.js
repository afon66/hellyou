import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) {
        throw new Error('Ошибка ' + response.status)
      }
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const deleteTodoFetch = createAsyncThunk(
  'todos/deleteTodoFetch',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error('Ошибки везде')
      }
      dispatch(deleteTodo(id))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    let todo = getState().todos.todos.find(todo => todo.id === id)
    try {
      let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      })
      if (!res.ok) {
        throw new Error('Ошибка пришла')
      }
      dispatch(addChecking(id))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch, getState }) {
    let length = getState().todos.todos.length
    try {
      let res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: length + 1, title: text, completed: false })
      })
      if (!res.ok) {
        throw new Error('Ошибка пришла')
      }
      const data = await res.json()
      console.log(data)
      dispatch(addTodos(data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

const initialState = {
  todos: [],
  status: null,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos(state, action) {
      state.todos.push(action.payload)
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    addChecking(state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload)
      toggledTodo.completed = !toggledTodo.completed
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodoFetch.rejected, setError)
      .addCase(toggleStatus.rejected, setError)
  }
})

export const { addTodos, deleteTodo, addChecking } = todoSlice.actions
export default todoSlice.reducer