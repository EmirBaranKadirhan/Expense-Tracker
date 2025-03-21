import React, { useState } from 'react'
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
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');



    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);     // firebase Authentication ile kayit
            const user = userCredential.user;

            // kullanici bilgilerini firestore'a kaydet
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,

            });

            console.log("Kullanıcı başarıyla kaydedildi:", user);
        } catch (error) {
            console.error("Kayıt hatası:", error);
        }
    }


    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1,            // Her iki tarafın eşit genişlikte olmasını sağlar
                    p: 2,
                    justifyContent: 'flex-end',
                    marginRight: '75px',
                    width: '700px',
                    height: '700px'
                }}
            >

                <Paper elevation={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '55%', height: '60%' }}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }} >
                        Kullanıcı Kayıt
                    </Typography>
                    <FormControl variant="standard" style={{ width: '95%' }}>
                        <TextField
                            label="Kullanici Adi Giriniz"
                            id="filled-start-adornment"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ m: 1, width: '100%' }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>,
                                },
                            }}
                            variant="outlined"
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex' }}>
                        <Button onClick={handleRegister} sx={{ width: '200px', marginRight: '58px', marginLeft: '8px' }} variant="contained">Kayit Ol</Button>
                        <Button color='success' sx={{ width: '200px' }} variant="contained">Giris Yap</Button>
                    </Box>

                </Paper>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{
                display: 'flex;', alignItems: 'center;', justifyContent: 'flex-start', flexGrow: 1,
                p: 2, marginLeft: '75px'
            }}>
                <Box sx={{ width: '650px', height: '650px' }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/8910/8910710.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
            </Box>

        </div >
    )
}

export default Login