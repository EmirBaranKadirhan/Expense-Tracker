import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const sendToFirestore = createAsyncThunk('incomes', async (income) => {      // ilk parametre olan 'incomes' slice'in ismi'dir. Ikinci parametre de GelirHesapla sayfasinda fonksiyona gecilen parametre'dir.
    try {
        const docRef = await addDoc(collection(db, "transactions"), income)     // firestore' a veriler buradan gonderilecek. "transactions" ==> firestore'da bir koleksiyon adini belirtir.
        return docRef.id;
    } catch (error) {
        console.log(error.message);

    }
})

export const sendExpensesToFirestore = createAsyncThunk('expenses', async (expense) => {
    try {
        const docRef = await addDoc(collection(db, "transactions"), expense)
        return docRef.id;
    } catch (error) {
        console.log(error.message);
    }
})

const initialState = {
    incomes: [],
    expenses: []
}


export const transactionsSlice = createSlice({
    name: "incomes",
    initialState,
    reducers: {
        addIncomes: (state, action) => {        // action ==> genellikle type ve payload bilgilerini tasir
            state.incomes.push(action.payload);
        },
        addExpenses: (state, action) => {
            state.expenses.push(action.payload);
        }

    },
    extraReducers: (builder) => {
        builder.addCase(sendToFirestore.fulfilled, (state, action) => {
            console.log(`Document incomes added with ID: ${action.payload}`);
        })

        builder.addCase(sendExpensesToFirestore.fulfilled, (state, action) => {
            console.log(`Document expenses added with ID: ${action.payload} `)
        })

    }
})

export const { addIncomes, addExpenses } = transactionsSlice.actions;
export default transactionsSlice.reducer