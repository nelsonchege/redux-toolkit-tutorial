import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems:[],
  amount:4,
  total:0,
  isLoading:true,
 }

 export const getCartItems  = createAsyncThunk('cart/getCartItems',async(thunkAPI) => {
  try{
    const resp = await axios(url);
    return resp.data;
  }catch(err){
    return thunkAPI.rejectWithValue('something went wrong');
  }
 })

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      clearCart: (state) => {
        state.cartItems = [];
      },
      removeItem: (state, action) => {
        const itemId = action.payload
        state.cartItems = state.cartItems.filter((item)=>item.id !==itemId)
      },
      toggleAmount: (state, {payload}) => {
        const cartItem = state.cartItems.find((item)=>item.id === payload.id)
        if(payload.actionType === 'add'){
            cartItem.amount +=1 
        }else{
            cartItem.amount -=1 
        }
      },
      calculateTotals: (state)=>{
        let amount = 0
        let total = 0
        
        state.cartItems.forEach((item)=>{
            amount +=item.amount
            total  += item.amount * item.price
        })
        state.total = total
        state.amount = amount
      }
    },
    extraReducers:{
      [getCartItems.pending]:(state)=>{
        state.isLoading = true
      },
      [getCartItems.fulfilled]:(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload;
      },
      [getCartItems.rejected]: (state,{payload}) => {
        state.isLoading = false;
        console.log(payload);
      }
    }
});

export const {clearCart,removeItem,toggleAmount,calculateTotals} = cartSlice.actions;
export default cartSlice.reducer