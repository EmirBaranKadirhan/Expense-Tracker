import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const sendToFirestore = createAsyncThunk('incomes', async ({ userId, income }) => {      // Ikinci parametre birden fazla degerleri "nesne{}"" seklinde alabilir. ilk parametre olan 'incomes' slice'in ismi'dir. Ikinci parametre de GelirHesapla sayfasinda fonksiyona gecilen parametre degeridir.
    try {
        const userDocRef = doc(db, "users", userId);
        const incomesCollectionRef = collection(userDocRef, "incomes");
        const docRef = await addDoc(incomesCollectionRef, income);
        // const docRef = await addDoc(collection(db, "transactions"), income)     // firestore' a veriler buradan gonderilecek. "transactions" ==> firestore'da bir koleksiyon adini belirtir.
        return docRef.id;
    } catch (error) {
        console.log(error.message);

    }
})

export const sendExpensesToFirestore = createAsyncThunk('expenses', async ({ userId, expensesData }) => {
    try {
        const userDocRef = doc(db, "users", userId);      // "users" koleksiyonundaki userId'ye sahip belgeyi hedef aliyoruz ki o belge uzerinde islem yapabilelim ya da referans olusturabilelim o belgeye
        const expensesCollectionRef = collection(userDocRef, "expense")     // belirli bir "kullanıcı belgesi" altında yer alan "expense alt koleksiyonunu" hedef aliriz ve bu koleksiyonda duzenleme ayrica referans olusturabiliriz  
        const docRef = await addDoc(expensesCollectionRef, expensesData);       // yukaridaki "expensesData" parametresi addDoc'a parametre olarak gecer ve firestore'a eklenir. 
        return docRef.id;
    } catch (error) {
        console.log(error.message);
    }
})


export const deleteFromFirebase = createAsyncThunk('transactions', async (id) => {      //  fonksiyon icindeki ilk parametre adlandirmasini biz istedigimiz gibi verebilirz !! 
    try {
        await deleteDoc(doc(db, 'transactions', id));
        return id;                  // asagida payload durumunda kullanilacak id buradan gelir
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

        builder.addCase(deleteFromFirebase.fulfilled, (state, action) => {
            console.log(`Document with ID: ${action.payload}`);
            state.incomes = state.incomes.filter((income) => income.id !== action.payload);
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        })
    }
})

export const { addIncomes, addExpenses } = transactionsSlice.actions;
export default transactionsSlice.reducer