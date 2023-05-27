import { configureStore } from '@reduxjs/toolkit'
import articleSlice from './article/articleSlice'
import authReducer from './auth/authSlice'
import forumSlice from './forum/forumSlice'
import getUserReducer from './getUserData/getUserData'
import lifehackSlice from './lifehack/lifehackSlice'
import postSlice from './post/postSlice'
import userReducer from './user/userSlice'
// import  placesSlice from './places/placesSlice'
import placesSlice  from './places/placesSlice'
import commentSlice from './comment/commentSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    getUser: getUserReducer,
    article: articleSlice,
    lifehack: lifehackSlice,
    forum: forumSlice,
    post: postSlice,
    places: placesSlice,
    comment: commentSlice
  },
})
