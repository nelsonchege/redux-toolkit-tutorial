import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../../constants/cartItems'

const initialState = {
 cartItems:cartItems,
 amount:4,
 total:0,
 isLoading:true,
}

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
});

export const {clearCart,removeItem,toggleAmount,calculateTotals} = cartSlice.actions;
export default cartSlice.reducer