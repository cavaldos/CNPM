import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  name: 'auth',
  initialState: {
    UserID: 0,
    UserName: '',
    Email: '',
    FullName: '',
    Role: 'Guest',
    CreatedTime: '',
    UpdateTime: '',
    ImageURL: '',
  },
  reducers: {
    setUser: (state, action) => {
      const { UserID, UserName, Email, FullName, Role, CreatedTime, UpdateTime, ImageURL } =
        action.payload;
      state.UserID = UserID;
      state.UserName = UserName;
      state.Email = Email;
      state.FullName = FullName;
      state.Role = Role;
      state.CreatedTime = CreatedTime;
      state.UpdateTime = UpdateTime;
      state.ImageURL = ImageURL;
    },
    clearUser: state => {
      state.UserID = null;
      state.UserName = null;
      state.Email = null;
      state.FullName = null;
      state.Role = null;
      state.CreatedTime = null;
      state.UpdateTime = null;
      state.ImageURL = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
