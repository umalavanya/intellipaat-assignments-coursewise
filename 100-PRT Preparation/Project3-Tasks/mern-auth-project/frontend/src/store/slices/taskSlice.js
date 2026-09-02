import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTaskToState: (state, action) => {
      state.tasks = action.payload;
    },
    toggleTaskInState: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTaskFromState: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks, addTaskToState, toggleTaskInState, deleteTaskFromState } = taskSlice.actions;
export default taskSlice.reducer;
