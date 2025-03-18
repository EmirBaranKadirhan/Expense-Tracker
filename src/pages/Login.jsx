import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 400,
                        height: 400,
                    },
                }}
            >


                <Paper elevation={5}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Kullanıcı Kayıt
                    </Typography>
                    <FormControl variant="standard" style={{ width: '95%' }}>
                        <TextField
                            label="Kullanici Adi Giriniz"
                            id="filled-start-adornment"
                            sx={{ m: 1, width: '100%' }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                                },
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="standard" style={{ width: '95%' }}>
                        <TextField
                            label="Sifre Giriniz"
                            id="filled-start-adornment"
                            sx={{ m: 1, width: '100%' }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                                },
                            }}
                            variant="outlined"
                            type="password"
                        />
                    </FormControl>
                    <FormControl variant="standard" style={{ width: '95%' }}>
                        <TextField
                            label="EMail Adresinizi Giriniz"
                            id="filled-start-adornment"
                            sx={{ m: 1, width: '100%' }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>,
                                },
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                </Paper>
            </Box>
        </div>
    )
}

export default Login