// store/searchSlice.ts
// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  keyword: string;
}

const initialState: SearchState = {
  keyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
