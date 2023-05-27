import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import lifehackService from './lifehackService'

const initialState = {
    allLifehacks: [],
    lifehack: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }


// Get all active lifehacks
export const getAllLifehacks = createAsyncThunk(
    'lifehack/getAllLifehacks',
    async ({page}, thunkAPI) => {
      try {
        return await lifehackService.getAllActiveLifehacks({page})
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


// Get lifehack by ID
export const getLifehackById = createAsyncThunk(
    'lifehack/getLifehackById',
    async (id, thunkAPI) => {
      try {
        return await lifehackService.getLifehackById(id)
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

  
// Add new lifehack
export const addNewLifehack = createAsyncThunk(
  'lifehack/addNewLifehack',
  async ({ lifehackData, formData }, thunkAPI) => {
    try {
      return await lifehackService.addNewLifehack({ lifehackData, formData })
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

// Edit lifehack by ID
export const editLifehack = createAsyncThunk(
  'lifehack/editLifehack',
  async ({ lifehackData, formData }, thunkAPI) => {
    try {
      return await lifehackService.editLifehack({ lifehackData, formData })
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

// Delete lifehack by ID
export const deleteLifehackById = createAsyncThunk(
  'lifehack/deleteLifehackById',
  async (id, thunkAPI) => {
    try {
      return await lifehackService.deleteLifehackById(id)
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

  export const lifehackSlice = createSlice({
    name: 'lifehack',
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
        .addCase(getAllLifehacks.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllLifehacks.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.allLifehacks = action.payload
        })
        .addCase(getAllLifehacks.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getLifehackById.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getLifehackById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.lifehack = action.payload
        })
        .addCase(getLifehackById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(addNewLifehack.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addNewLifehack.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(addNewLifehack.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(editLifehack.pending, (state) => {
          state.isLoading = true
        })
        .addCase(editLifehack.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(editLifehack.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteLifehackById.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteLifehackById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(deleteLifehackById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })
  
  export const { reset } = lifehackSlice.actions
  export default lifehackSlice.reducer