import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses, sendExpensesToFirestore } from '../redux/slices/transactionsSlice'
import { db, auth } from '../firebase/firebaseConfig'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";



function GiderHesaplama() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([
        {
            value: 'gida harcamalari',
            label: 'Gida Harcamalari',
        },
        {
            value: 'egitim harcalamalari',
            label: 'Egitim Harcamalari',
        },
        {
            value: 'ulasim harcamalari',
            label: 'Ulasim Harcamalari',
        },
        {
            value: 'kiyafet harcamalari',
            label: 'Kiyafet Harcamalari',
        },
    ]);
    const [description, setDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const expenses = useSelector((state) => state.expenses.expenses)
    console.log(expenses)

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (amount) {
            const userId = auth.currentUser.uid;
            console.log(userId)
            const expensesData = { type: "Gider", amount: Number(amount), category, description, date: new Date().toLocaleDateString('tr-TR') }
            dispatch(addExpenses(expensesData));
            dispatch(sendExpensesToFirestore({ userId, expensesData }));
            setAmount("");
            setCategory("");
            setDescription("");
        }

    }

    const handleAddCategory = async () => {
        if (newCategory !== '') {
            const formattedCategory = {
                value: newCategory,
                label: newCategory
            }

            setCategories([...categories, formattedCategory]);
            setNewCategory("");
            setOpenDialog(false);
        }
        try {
            const userId = auth.currentUser.uid;
            const docRef = doc(db, 'users', userId);

            await updateDoc(docRef, {
                expenseCategories: arrayUnion(newCategory)
            })
            console.log("Expense Category added to Firestore");
        } catch (error) {
            console.error("Error adding category to Firestore: ", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchCategories = async () => {
                    try {
                        const userId = auth.currentUser.uid;
                        const docRef = doc(db, 'users', userId);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            const firestoreExpenseCategories = userData.expenseCategories || [];
                            setCategories((prevCategories) => [
                                ...prevCategories, ...firestoreExpenseCategories.map((item) => ({
                                    value: item,
                                    label: item
                                }))
                            ])
                        }

                    } catch (error) {
                        console.log("Error fetching categories:", error);
                    }
                }

                fetchCategories();

            } else {
                console.log("User is not logged in.");
            }
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        console.log(categories)
    }, [categories])


    return (
        <div>
            <Box sx={{ width: '500px', display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ marginTop: '20px' }} >
                    <InputLabel htmlFor="outlined-adornment-amount">Miktar</InputLabel>
                    <FilledInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">₺</InputAdornment>}
                        label="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </FormControl>

                <TextField sx={{ marginTop: '20px' }}
                    id="filled-select-currency"
                    select
                    label="Gider Türü Seçimi Yapınız"
                    helperText=""
                    variant="filled"
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="filled-multiline-static"
                    label="Açıklama"
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ marginTop: '20px' }}
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                <Button onClick={handleSubmit} color='error' variant="contained" sx={{ marginTop: '20px' }}>Gider Ekle</Button>
                <Button onClick={() => setOpenDialog(true)} variant="outlined" sx={{ marginTop: '20px' }}>Gider Türü Ekle</Button>
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Yeni Kategori Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Kategori Adı"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewCategory(e.target.value)}
                    // value={ }

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>İptal</Button>
                    <Button onClick={handleAddCategory}>Ekle</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default GiderHesaplama