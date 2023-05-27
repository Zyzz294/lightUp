import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placesService from './placesService'

const initialState = {
  allPlaces: [],
  place: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all active places by id
export const getAllPlaces = createAsyncThunk(
  'places/getAllPlaces',
  async (categoryId, thunkAPI) => {
    try {
      return await placesService.getAllActivePlaces(categoryId)
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

// Get place by ID
export const getPlaceById = createAsyncThunk(
  'places/getPlaceById',
  async (id, thunkAPI) => {
    try {
      return await placesService.getPlaceById(id)
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

// Add new place
export const addNewPlace = createAsyncThunk(
  'place/addNewPlace',
  async ({ placeData, formData, token }, thunkAPI) => {
    try {
      return await placesService.addNewPlace({ placeData, formData, token })
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

// Add new place
export const deletePlaceById = createAsyncThunk(
  'place/deletePlaceById',
  async (id, thunkAPI) => {
    try {
      return await placesService.deletePlaceById(id)
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

export const placesSlice = createSlice({
  name: 'places',
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
      .addCase(getAllPlaces.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPlaces.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allPlaces = action.payload
      })
      .addCase(getAllPlaces.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPlaceById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaceById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.place = action.payload
      })
      .addCase(getPlaceById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNewPlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewPlace.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(addNewPlace.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePlaceById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePlaceById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deletePlaceById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = placesSlice.actions
export default placesSlice.reducer
