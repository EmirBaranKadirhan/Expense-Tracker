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
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses, sendExpensesToFirestore } from '../redux/slices/transactionsSlice'


const currencies = [
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
];




function GiderHesaplama() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("")

    const expenses = useSelector((state) => state.expenses.expenses)
    console.log(expenses)

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (amount) {
            const expensesData = { id: Math.floor(Math.random() * 10000), amount, category, description }
            dispatch(addExpenses(expensesData));
            dispatch(sendExpensesToFirestore(expensesData));
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
                    label="Gider Türü Seçimi Yapınız"
                    helperText=""
                    variant="filled"
                    onChange={e => setCategory(e.target.value)}
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
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                <Button onClick={handleSubmit} color='error' variant="contained" sx={{ marginTop: '20px' }}>Gider Ekle</Button>
            </Box>

        </div>
    )
}

export default GiderHesaplama