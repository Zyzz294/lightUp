import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  allPosts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all active posts
export const getAllActivePosts = createAsyncThunk(
  'post/getAllActivePosts',
  async ({ page, token }, thunkAPI) => {
    try {
      return await postService.getAllActivePosts({ page, token })
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

// Get post by ID
export const getPostById = createAsyncThunk(
  'post/getPostById',
  async ({ id, token }, thunkAPI) => {
    try {
      return await postService.getPostById({ id, token })
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

// Add new post
export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async ({ postData, formData, token }, thunkAPI) => {
    try {
      return await postService.addNewPost({ postData, formData, token })
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

// Get all pending posts
export const getAllPendingPosts = createAsyncThunk(
  'post/getAllPendingPosts',
  async (token, thunkAPI) => {
    try {
      return await postService.getAllPendingPosts(token)
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

// Get all approved posts
export const getAllApprovedPosts = createAsyncThunk(
  'post/getAllApprovedPosts',
  async (token, thunkAPI) => {
    try {
      return await postService.getAllApprovedPosts(token)
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

// Get all dissapproved posts
export const getAllDisapprovedPosts = createAsyncThunk(
  'post/getAllDisaprovedPosts',
  async ({ page, token }, thunkAPI) => {
    try {
      return await postService.getAllDisapprovedPosts({ page, token })
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

// Approve Post by ID
export const approvePostById = createAsyncThunk(
  'post/approvePostById',
  async (postId, thunkAPI) => {
    try {
      return await postService.approvePostById(postId)
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

// Disapprove Post by ID
export const disapprovePostById = createAsyncThunk(
  'post/disapprovePostById',
  async (postId, thunkAPI) => {
    try {
      return await postService.disapprovePostById(postId)
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

// Like Post by ID
export const likePostById = createAsyncThunk(
  'post/likePostById',
  async ({postId, token}, thunkAPI) => {
    try {
      return await postService.likePostById({postId, token})
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

export const postSlice = createSlice({
  name: 'post',
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
      .addCase(getAllActivePosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllActivePosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allPosts = action.payload
      })
      .addCase(getAllActivePosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNewPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllPendingPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPendingPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allPosts = action.payload
      })
      .addCase(getAllPendingPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllApprovedPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllApprovedPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allPosts = action.payload
      })
      .addCase(getAllApprovedPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllDisapprovedPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllDisapprovedPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allPosts = action.payload
      })
      .addCase(getAllDisapprovedPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(approvePostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(approvePostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(approvePostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(disapprovePostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(disapprovePostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(disapprovePostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(likePostById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(likePostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(likePostById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
