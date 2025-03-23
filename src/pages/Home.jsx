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

function Home() {

    const [userInfo, setUserInfo] = useState({});
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);


    const [user] = useAuthState(auth);



    useEffect(() => {
        const getDataFromFirebase = async () => {
            if (user) {
                try {
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
    return (
        <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ display: 'flex', width: '800px', height: '500px' }}>
                <Box>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            {username}
                        </Typography>
                        <Typography>
                            {email}
                        </Typography>
                        <Typography>
                            <TrendingUpIcon /> Gelir Miktari: {totalIncomes}
                        </Typography>
                        <Typography>
                            <TrendingDownIcon /> Gider Miktari: {totalExpenses}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: '400px', objectFit: 'cover', height: '80%' }}
                    image="https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png"
                    alt="Live from space album cover"
                />
            </Card>
        </div>
    )
}

export default Home