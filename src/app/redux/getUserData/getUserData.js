import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
}

export const getUserDataSlice = createSlice({
  name: 'getUserData',
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const { getUserData } = getUserDataSlice.actions

export default getUserDataSlice.reducer
