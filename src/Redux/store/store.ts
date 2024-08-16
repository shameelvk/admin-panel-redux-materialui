import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../slice/product-slice'
import categorysReducer from '../slice/category-slice'


export const store = configureStore({
  reducer: {
    products:ProductReducer,
    categorys:categorysReducer
    
},
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch