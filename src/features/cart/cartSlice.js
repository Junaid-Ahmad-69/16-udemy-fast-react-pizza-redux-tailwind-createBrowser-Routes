import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice

            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearItem(state) {
            state.cart = []
        },
    },
});


export const {addItem, deleteItem, clearItem, decreaseItemQuantity, increaseItemQuantity,} = cartSlice.actions
export default cartSlice.reducer

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCartItemById = (id) => state => state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0

