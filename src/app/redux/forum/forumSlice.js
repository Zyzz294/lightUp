import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import forumService from './forumService'

const initialState = {
  allForums: [],
  forum: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Add new forum
export const addNewForum = createAsyncThunk(
  'forum/addNewforum',
  async ({ descr, token }, thunkAPI) => {
    try {
      return await forumService.addNewForum({ descr, token })
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

// Get all forums
export const getAllForums = createAsyncThunk(
  'forum/getAllForums',
  async (thunkAPI) => {
    try {
      return await forumService.getAllForums()
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

// Get all approved forums
export const getAllApprovedForums = createAsyncThunk(
  'forum/getAllApprovedForums',
  async (thunkAPI) => {
    try {
      return await forumService.getAllApprovedForums()
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

// Get all rejected forums
export const getAllRejectedForums = createAsyncThunk(
  'forum/getAllRejectedForums',
  async (thunkAPI) => {
    try {
      return await forumService.getAllRejectedForums()
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

// Get all pending forums
export const getAllPendingForums = createAsyncThunk(
  'forum/getAllPendingForums',
  async (thunkAPI) => {
    try {
      return await forumService.getAllPendingForums()
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

// Verify forum by ID
export const verifyForumById = createAsyncThunk(
  'forum/verifyForumById',
  async ({ id, token }, thunkAPI) => {
    try {
      return await forumService.verifyForumById({ id, token })
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

// Delete forum by ID
export const deleteForumById = createAsyncThunk(
  'forum/deleteForumById',
  async (id, thunkAPI) => {
    try {
      return await forumService.deleteForumById(id)
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

export const forumSlice = createSlice({
  name: 'forum',
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
      .addCase(addNewForum.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewForum.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addNewForum.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllForums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllForums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allForums = action.payload
      })
      .addCase(getAllForums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllApprovedForums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllApprovedForums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allForums = action.payload
      })
      .addCase(getAllApprovedForums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllRejectedForums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllRejectedForums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allForums = action.payload
      })
      .addCase(getAllRejectedForums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllPendingForums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPendingForums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allForums = action.payload
      })
      .addCase(getAllPendingForums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(verifyForumById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyForumById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(verifyForumById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteForumById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteForumById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteForumById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = forumSlice.actions
export default forumSlice.reducer
