import { ProductServices } from "@/app/services/ProductServices"
import { Product } from "@/modal/modals"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export interface productState {
  product: Product[],
  isProgress: boolean,
  isError?: any
}

const initialState: productState = {
  product: [],
  isProgress: false


}


export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (deletePrdId: number, thunkAPI) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${deletePrdId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return deletePrdId;
  }
)



export const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    
    editProducts: (state, action) => {
      const index = state.product.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.product[index] = action.payload;
      }
    },

    addNewProducts: (state, action) => {
      console.log([...state.product,action.payload]);
      
     state.product=[...state.product,action.payload]
      
    },

  },



  extraReducers: (builder) => {

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.product = state.product.filter(product => product.id !== action.payload);
      state.isProgress = false;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isProgress = false,
        state.isError = "this is error"

    })

  },
})



export const { addProduct, editProducts,addNewProducts } = productSlice.actions

export default productSlice.reducer