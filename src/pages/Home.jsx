import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { auth, db } from '../firebase/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Button } from '@mui/material';


function Home() {

    const [userInfo, setUserInfo] = useState({});
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [photoURL, setPhotoURL] = useState('');

    const [user] = useAuthState(auth);



    useEffect(() => {
        const getDataFromFirebase = async () => {
            if (user) {
                try {
                    const responsePhoto = await axios.get(`https://randomuser.me/api/?seed=${user.uid}`);   // seed ==> bununla birlikte hedef kisiye hep ayni resim gelecek
                    const photoURL = responsePhoto.data.results[0].picture.large;
                    setPhotoURL(photoURL)
                    const userDocRef = await getDoc(doc(db, 'users', user.uid));  // 'users/{userId}' şeklinde
                    console.log(userDocRef.data())
                    setUserInfo(userDocRef.data())

                    const incomesQueryshot = await getDocs(collection(db, 'users', user.uid, 'incomes'));
                    const incomesData = incomesQueryshot.docs.map((doc) => doc.data())
                    setIncomes(incomesData)

                    const expensesQueryshot = await getDocs(collection(db, 'users', user.uid, 'expenses'));
                    const expensesData = expensesQueryshot.docs.map((doc) => doc.data());
                    setExpenses(expensesData)

                } catch (error) {
                    console.log("Veri çekme hatası:", error);
                }
            }

        }
        getDataFromFirebase();
    }, [user])

    const { username, email } = userInfo

    console.log(incomes)

    const totalIncomes = incomes.reduce((acc, income) => {
        return acc + income.amount;
    }, 0)

    console.log(totalIncomes)

    const totalExpenses = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0)
    console.log(totalExpenses)

    const totalAssets = totalIncomes - totalExpenses
    console.log(totalAssets)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ display: 'flex', width: '850px', height: '600px', alignItems: 'center', borderRadius: 4, boxShadow: 6 }}>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4, gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={photoURL} sx={{ width: 60, height: 60 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{username}</Typography>
                    </Box>

                    <Card sx={{
                        backgroundColor: '#e8f5e9', borderRadius: 3, padding: 2, '&:hover': { boxShadow: 4 }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingUpIcon sx={{ fontSize: 40, color: '#388e3c' }} />
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#2e7d32' }}>Toplam Gelir</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>{totalIncomes} ₺</Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card sx={{
                        backgroundColor: '#ffebee', borderRadius: 3, padding: 2, '&:hover': { boxShadow: 4 }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingDownIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#c62828' }}>Toplam Gider</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>{totalExpenses} ₺</Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card sx={{
                        backgroundColor: totalAssets >= 0 ? '#e3f2fd' : '#fce4ec',
                        borderRadius: 3, padding: 2, mt: 1, borderLeft: `6px solid ${totalAssets >= 0 ? '#2196f3' : '#f06292'}`
                    }}>
                        <Typography variant="subtitle1" sx={{ color: totalAssets >= 0 ? '#1976d2' : '#c2185b' }}>
                            {totalAssets >= 0 ? 'Kârdasınız' : 'Zarardasınız'}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: totalAssets >= 0 ? '#0d47a1' : '#880e4f' }}>
                            {totalAssets} ₺
                        </Typography>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 1 }}>
                    {photoURL && (
                        <CardMedia
                            component="img"
                            sx={{ width: '400px', objectFit: 'cover', height: '375px' }}
                            image={photoURL}
                            alt="Profil Fotoğrafı"
                        />
                    )}
                    <Button variant="contained" color="secondary" >
                        Profil Düzenle
                    </Button>
                </Box>
            </Card>
        </div>
    )
}

export default Home