import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  isPostPage: boolean;
  tags: string[];
}

const initialState: LayoutState = {
  isPostPage: false,
  tags: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsPostPage(state, action: PayloadAction<boolean>) {
      state.isPostPage = action.payload;
    },
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
  },
});

export const { setIsPostPage, setTags } = layoutSlice.actions;
export default layoutSlice.reducer;
