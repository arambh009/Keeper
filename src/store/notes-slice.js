import { createSlice } from '@reduxjs/toolkit';
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      existingItem.title=newItem.title;
      existingItem.content=newItem.content;
      existingItem.tagline=newItem.tagline;
      state.changed = true;
      
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      
      state.changed = true;
      
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          tagline: newItem.tagline,
          content: newItem.content,
        });
      
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
     
      state.changed = true;
      
        state.items = state.items.filter((item) => item.id !== id);
      
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice;