import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import articleService from './articleService'

const initialState = {
  allArticles: [],
  article: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all active articles
export const getAllArticles = createAsyncThunk(
  'article/getAllArticles',
  async ({page}, thunkAPI) => {
    try {
      return await articleService.getAllActiveArticles({page})
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

// Get article by ID
export const getArticleById = createAsyncThunk(
  'article/getArticleById',
  async (id, thunkAPI) => {
    try {
      return await articleService.getArticleById(id)
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

// Add new article
export const addNewArticle = createAsyncThunk(
  'article/addNewArticle',
  async ({ articleData, formData }, thunkAPI) => {
    try {
      return await articleService.addNewArticle({ articleData, formData })
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

// Edit article by ID
export const editArticle = createAsyncThunk(
  'article/editArticle',
  async ({ articleData, formData }, thunkAPI) => {
    try {
      return await articleService.editArticle({ articleData, formData })
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

// Delete article by ID
export const deleteArticleById = createAsyncThunk(
  'article/deleteArticleById',
  async (id, thunkAPI) => {
    try {
      return await articleService.deleteArticleById(id)
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

export const articleSlice = createSlice({
  name: 'article',
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
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allArticles = action.payload
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getArticleById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.isLoading = false
        // state.isSuccess = true
        state.article = action.payload
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNewArticle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addNewArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editArticle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteArticleById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteArticleById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = articleSlice.actions
export default articleSlice.reducer
