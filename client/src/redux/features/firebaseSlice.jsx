import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'firebase',
  initialState: {
    UserID: 3,
    UserName: 'peter789',
    Email: 'peter@example.com',
    FullName: 'Peter Johnson',
    Role: 'Instructor',
    CreatedTime: '2025-01-03 09:15:00.000',
    UpdateTime: '2025-01-03 09:15:00.000',
  },
  reducers: {},
});

export default authSlice.reducer;
