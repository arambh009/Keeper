import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showNoteWithId:-1, 
    noteModalIsVisible: false,
    createNoteModalIsVisible:false
  },
  reducers: {
    toggleCreateNoteModal(state) {
      state.createNoteModalIsVisible= !state.createNoteModalIsVisible;
    },
    toggleNoteModal(state,action) {
      state.noteModalIsVisible= !state.noteModalIsVisible;
      // console.log(action.payload);
      state.showNoteWithId=action.payload;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
