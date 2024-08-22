import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUS = Object.freeze({
    SUCCESS:'SUCCESS',
    ERROR:"error",
    Loading:"loading"
})

const ProductSlice = createSlice({
    name:"Product",
    initialState:{
        data:[],
        status: STATUS.SUCCESS
    },

    reducers:{
        setProducts(state,action){
            state.data = action.payload
        },

        setStatus(state,action){
            state.status = action.payload
        }
    }
})

export const {setProducts,setStatus} = ProductSlice.actions;
export default ProductSlice.reducer


export function fetchProduct(){
    return async function fetchProductThunk(dispatch) {
        dispatch(setStatus(STATUS.Loading))

        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            dispatch(setProducts(response.data));
          } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUS.ERROR))
          } finally {
            dispatch(setStatus(STATUS.SUCCESS))
          }
    }
}