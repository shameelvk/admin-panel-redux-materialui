import { ProductServices } from "@/app/services/ProductServices"
import { Category } from "@/modal/modals"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export interface productState {
  category: Category[],
  isProgress: boolean,
  isError?: any
}

const initialState: productState = {
    category: [],
  isProgress: false


}


export const deleteCatgory = createAsyncThunk(
  'product/deleteProduct',
  async (deletecatId: number, thunkAPI) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${deletecatId}`, {
        method: 'DELETE',
      });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return deletecatId;
  }
)



export const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    
    editCategorys: (state, action) => {
      const index = state.category.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.category[index] = action.payload;
      }
    },

    addNewCategory: (state, action) => {
      
     state.category=[...state.category,action.payload]
      
    },

  },



  extraReducers: (builder) => {

    builder.addCase(deleteCatgory.fulfilled, (state, action) => {
      state.category = state.category.filter(category => category.id !== action.payload);
      state.isProgress = false;
    });

    builder.addCase(deleteCatgory.rejected, (state, action) => {
      state.isProgress = false,
        state.isError = "this is error"

    })

  },
})



export const { addCategory, editCategorys,addNewCategory } = productSlice.actions

export default productSlice.reducer