
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }

            cartSlice.caseReducers.calculateTotals(state);
        },


        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            cartSlice.caseReducers.calculateTotals(state);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }

            cartSlice.caseReducers.calculateTotals(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        calculateTotals: (state) => {
            state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },


        loadCartFromStorage: (state, action) => {
            return { ...action.payload };
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;