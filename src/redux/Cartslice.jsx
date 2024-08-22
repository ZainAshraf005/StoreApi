import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    removeAll() {
      // Return an empty array to remove all items
      return [];
    },
  },
});

export const { add, remove, removeAll } = cartSlice.actions;
export default cartSlice.reducer;