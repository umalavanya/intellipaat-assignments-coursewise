import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: null, // { type: 'success'|'error'|'info', message: '' }
    isTaskModalOpen: false,
    editingTaskId: null,
    isSidebarOpen: true
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
    openCreateTaskModal: (state) => {
      state.isTaskModalOpen = true;
      state.editingTaskId = null;
    },
    openEditTaskModal: (state, action) => {
      state.isTaskModalOpen = true;
      state.editingTaskId = action.payload;
    },
    closeTaskModal: (state) => {
      state.isTaskModalOpen = false;
      state.editingTaskId = null;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  }
});

export const {
  showToast,
  hideToast,
  openCreateTaskModal,
  openEditTaskModal,
  closeTaskModal,
  toggleSidebar
} = uiSlice.actions;

export default uiSlice.reducer;
