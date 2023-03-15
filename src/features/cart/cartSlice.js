import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';
const url =  'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk(
    'cart/getCartItems', async(name, thunkAPI)=>{
        try {
            //console.log(thunkAPI);
            //console.log(thunkAPI.getState());
            //thunkAPI.dispatch(openModal());
            
            const resp = await axios(url); //make an HTTP request to url using axios
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
});

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
        },//filter method - creates new array of items without above ID and is returned by reducer as new array
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item)=>item.id 
            === payload.id)
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item)=>item.id 
            === payload.id)
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount*item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers:{ //lifecycle actions(3) for every function
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});
export const { clearCart, removeItem , increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;