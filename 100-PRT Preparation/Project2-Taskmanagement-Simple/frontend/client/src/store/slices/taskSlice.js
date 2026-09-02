import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const res = await api.get('/tasks')
  return res.data
})

export const addTask = createAsyncThunk('tasks/add', async (description) => {
  const res = await api.post('/tasks', { description })
  return res.data
})

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }) => {
  const res = await api.put(`/tasks/${id}`, data)
  return res.data
})

export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  await api.delete(`/tasks/${id}`)
  return id
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
        state.items.sort((a, b) => a.completed - b.completed)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
        state.items.sort((a, b) => a.completed - b.completed)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload)
      })
  }
})

export default tasksSlice.reducer