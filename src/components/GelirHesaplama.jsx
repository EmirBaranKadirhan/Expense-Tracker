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
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



function GelirHesaplama() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([
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
    ]);

    const [description, setDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const incomes = useSelector((state) => state.transactions.incomes)
    console.log(incomes);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (amount && category) {
            const userId = auth.currentUser.uid;    // auth.currentUser => su anda oturum acmis olan kullanciyi temsil eder
            const income = { type: "Gelir", amount: Number(amount), category, description, date: new Date().toLocaleDateString('tr-TR') };
            dispatch(addIncomes(income));
            dispatch(sendToFirestore({ userId, income }));
            setAmount("");
            setCategory("");
            setDescription("");


        }
    }

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            const formattedCategory = {
                value: newCategory,
                label: newCategory
            }
            setCategories([...categories, formattedCategory]);   // kategoriler listesine yeni kategoriyi ekledik
            setNewCategory("");
            setOpenDialog(false);

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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <Button onClick={handleSubmit} color='success' variant="contained" sx={{ marginTop: '20px' }}>Gelir Ekle</Button>
                <Button onClick={() => setOpenDialog(true)} variant="outlined" sx={{ marginTop: '20px' }}>Gelir Türü Ekle</Button>
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
        </div >
    )
}

export default GelirHesaplama