import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    admin: { loginId: "", name: "", photo: "", phone: "", roleName: "" },
  },
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },
  },
});
export const store = configureStore({
    reducer: {
        adminSlice: adminSlice.reducer
    },
  });