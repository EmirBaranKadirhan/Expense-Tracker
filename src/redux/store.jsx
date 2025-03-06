import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../redux/slices/transactionsSlice'
import expensesReducer from '../redux/slices/transactionsSlice'

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        expenses: expensesReducer
    },
})