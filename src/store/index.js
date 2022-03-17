import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import notesSlice from './notes-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, notes: notesSlice.reducer },
});

export default store;