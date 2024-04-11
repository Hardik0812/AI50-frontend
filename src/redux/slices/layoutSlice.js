import { createSlice } from "@reduxjs/toolkit";
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem("menuCollapsed");
  return item ? JSON.parse(item) : false;
};

const initialSkin = () => {
  const item = window.localStorage.getItem("skin");
  return item ? JSON.parse(item) : "light";
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    skin: initialSkin(),
    menuCollapsed: initialMenuCollapsed(),
  },
  reducers: {
    handleSkin: (state, action) => {
      state.skin = action.payload;
      window.localStorage.setItem("skin", JSON.stringify(action.payload));
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload;
      window.localStorage.setItem(
        "menuCollapsed",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { handleSkin, handleMenuCollapsed } = layoutSlice.actions;

export default layoutSlice.reducer;
