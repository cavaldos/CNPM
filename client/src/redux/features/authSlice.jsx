import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// {
//   "UserID": 1,
//     "UserName": "john123",
//       "Email": "john@example.com",
//         "FullName": "John Doe",
//           "Role": "Student",
//             "CreatedTime": "2025-01-01T10:00:00.000Z",
//               "UpdateTime": "2025-01-01T10:00:00.000Z"
// }
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    UserID: 3,
    UserName: "peter789",
    Email: "peter@example.com",
    FullName: "Peter Johnson",
    Role: "Instructor",
    CreatedTime: "2025-01-03 09:15:00.000",
    UpdateTime: "2025-01-03 09:15:00.000",
  },
  reducers: {
    setUser: (state, action) => {
      const { UserID, UserName, Email, FullName, Role, CreatedTime, UpdateTime } = action.payload;
      console.log('Payload:', action.payload);
      state.UserID = UserID;
      state.UserName = UserName;
      state.Email = Email;
      state.FullName = FullName;
      state.Role = Role;
      state.CreatedTime = CreatedTime;
      state.UpdateTime = UpdateTime;
    },
    clearUser: (state) => {
      state.UserID = null;
      state.UserName = null;
      state.Email = null;
      state.FullName = null;
      state.Role = null;
      state.CreatedTime = null;
      state.UpdateTime = null;
    },

  },

});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
