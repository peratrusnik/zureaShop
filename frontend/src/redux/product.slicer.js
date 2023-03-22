import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    randomProduct: null
}

const ProductSlicer = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setRandomProduct(state, data) {
            state.randomProduct = data.payload
        },
    }
})

export const {setRandomProduct} = ProductSlicer.actions
export default ProductSlicer.reducer