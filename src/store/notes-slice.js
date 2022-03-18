import { createSlice } from '@reduxjs/toolkit';
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    changed: false,
  },

  reducers: {

    replaceNotesList(state, action) {
      state.items = action.payload.items;
      
    },

    updateNotesList(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      existingItem.title=newItem.title;
      existingItem.content=newItem.content;
      existingItem.tagline=newItem.tagline;
      state.changed = true;
    },

    addItemToNotesList(state, action) {
      const newItem = action.payload;
      
      state.changed = true;
      
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          tagline: newItem.tagline,
          pinned:false,
          content: newItem.content,
        });
      
    },
    updatePin(state,action){
      const id=action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.pinned=!existingItem.pinned;
      state.changed=true;
      const pinnedNotes=state.items.filter((item) => item.pinned ==true);
      const unpinnedNotes=state.items.filter((item) => item.pinned == false);
      
      const finalNotes=[...pinnedNotes,...unpinnedNotes];
      state.items=finalNotes;
    },

    removeItemFromNotesList(state, action) {
      const id = action.payload;
      state.changed = true;
      state.items = state.items.filter((item) => item.id !== id);
      
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice;