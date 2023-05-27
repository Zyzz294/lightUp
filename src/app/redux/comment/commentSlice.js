import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentService'

const initialState = {
  allComments: [],
  comment: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Comment Post by ID
export const commentPostById = createAsyncThunk(
  'comment/commentPostById',
  async ({postId, comment, token}, thunkAPI) => {
    try {
      return await commentService.commentPostById({postId, comment, token})
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

// Comment Post by ID
export const getCommentsByPostId = createAsyncThunk(
  'comment/getCommentsByPostId',
  async ({postId}, thunkAPI) => {
    try {
      return await commentService.getCommentsByPostId({postId})
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

export const commentSlice = createSlice({
  name: 'comment',
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
      .addCase(commentPostById.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(commentPostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(commentPostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCommentsByPostId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allComments = action.payload
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = commentSlice.actions
export default commentSlice.reducer
