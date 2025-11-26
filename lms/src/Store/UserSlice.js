import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    purchasedCourses: [],
  },
  reducers: {
    login: (state, action) => {
      // payload: { user: {...}, purchasedCourses: [...] }
      state.user = action.payload.user;
      state.purchasedCourses = action.payload.purchasedCourses || [];
    },
    logout: (state) => {
      state.user = null;
      state.purchasedCourses = [];
    },
    addPurchasedCourse: (state, action) => {
      const courseId = action.payload;
      if (!state.purchasedCourses.includes(courseId)) {
        state.purchasedCourses.push(courseId);
      }
    },
  },
});

export const { login, logout, addPurchasedCourse } = userSlice.actions;
export default userSlice.reducer;
