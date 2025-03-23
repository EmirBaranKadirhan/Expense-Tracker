import React, { useState } from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { addIncomes, sendToFirestore } from '../redux/slices/transactionsSlice'
import { auth } from '../firebase/firebaseConfig'


const currencies = [
    {
        value: 'web sitesi yapimi',
        label: 'Web Sitesi Yapimi',
    },
    {
        value: 'seo calismasi',
        label: 'SEO Calismasi',
    },
    {
        value: 'diger gelirler',
        label: 'Diger Gelirler',
    }
];


function GelirHesaplama() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const incomes = useSelector((state) => state.transactions.incomes)
    console.log(incomes);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (amount) {
            const userId = auth.currentUser.uid;    // auth.currentUser => su anda oturum acmis olan kullanciyi temsil eder
            const income = { type: "Gelir", amount: Number(amount), category, description, date: new Date().toLocaleDateString('tr-TR') };
            dispatch(addIncomes(income));
            dispatch(sendToFirestore({ userId, income }));
            setAmount("");
            setCategory("");
            setDescription("");


        }
    }


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
                    label="Gelir Türü Secimi Yapiniz"
                    defaultValue="web sitesi yapimi"
                    helperText=""
                    variant="filled"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    {currencies.map((option) => (
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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <Button onClick={handleSubmit} color='success' variant="contained" sx={{ marginTop: '20px' }}>Gelir Ekle</Button>
            </Box>
        </div>
    )
}

export default GelirHesaplama