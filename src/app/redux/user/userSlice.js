import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  allUsers: [],
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Reset Password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (email, thunkAPI) => {
    try {
      return await userService.resetPassword(email)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Verify Reset Password Code
export const verifyResetPassCode = createAsyncThunk(
  'user/verifyResetPassCode',
  async (confirmCode, thunkAPI) => {
    try {
      return await userService.verifyResetPassCode(confirmCode)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Change(set) new password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (newPassword, thunkAPI) => {
    try {
      return await userService.changePassword(newPassword)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all users
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (thunkAPI) => {
    try {
      return await userService.getAllUsers()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all users
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      return await userService.getUserById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all users
export const getAllModerators = createAsyncThunk(
  'user/getAllModerators',
  async (thunkAPI) => {
    try {
      return await userService.getAllModerators()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Add new user
export const addNewUser = createAsyncThunk(
  'user/addNewUser',
  async (userData, thunkAPI) => {
    try {
      return await userService.addNewUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Edit user
export const editUser = createAsyncThunk(
  'user/editUser',
  async (userData, thunkAPI) => {
    try {
      return await userService.editUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user by ID
export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUserById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Edit profile
export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({ id, token, profileData }, thunkAPI) => {
    try {
      return await userService.editProfile({ id, token, profileData })
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Edit profile
export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ id, token, formData }, thunkAPI) => {
    try {
      return await userService.updateAvatar({ id, token, formData })
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(verifyResetPassCode.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyResetPassCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(verifyResetPassCode.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allUsers = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllModerators.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllModerators.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allUsers = action.payload
      })
      .addCase(getAllModerators.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
