import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;// contains ID of the item
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },//filter method - creates new array of items withour above ID and is returned by reducer as new array
    },
});

//console.log(cartSlice);
export const { clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;