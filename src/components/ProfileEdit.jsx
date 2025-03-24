import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, Avatar, Snackbar } from '@mui/material';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                const data = userSnap.data();
                setUsername(data.username);
                setEmail(data.email);
                setPhotoURL(data.photoURL || '');
            }
        };
        fetchData();
    }, [user]);

    const handleSave = async () => {
        if (user) {
            try {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    username,
                    email,
                    photoURL,
                });
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                console.error('Güncelleme hatası:', error);
            }
        }
    };

    const handleRandomPhoto = async () => {
        const randomNumber = Math.floor(Math.random() * 200) + 1        // rastgele sayi alip  asagidaki url ye verdik
        const response = await axios.get(`https://randomuser.me/api/?seed=${randomNumber}`);
        const newPhoto = response.data.results[0].picture.large;
        setPhotoURL(newPhoto);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ padding: 4, width: '500px', borderRadius: 4, boxShadow: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Profili Düzenle
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar src={photoURL} sx={{ width: 100, height: 100 }} />
                    </Box>

                    <TextField
                        label="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Fotoğraf URL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        fullWidth
                    />
                    <Button variant="outlined" onClick={handleRandomPhoto}>
                        Rastgele Fotoğraf Al
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Kaydet
                    </Button>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Profil başarıyla güncellendi!"
                />
            </Card>
        </Box>
    );
}

export default ProfileEdit;
