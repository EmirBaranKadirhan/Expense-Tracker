import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { auth, db } from '../firebase/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import UserCardInfo from '../components/UserCardInfo';
import IncomesCard from '../components/IncomesCard';
import ExpensesCard from '../components/ExpensesCard';
import ProfileImageSection from '../components/ProfileImageSection';
import AssetsCard from '../components/AssetsCard';

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

    const { username, email, photoURL } = userInfo

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
    // console.log(totalAssets)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ display: 'flex', width: '850px', height: '600px', alignItems: 'center', borderRadius: 4, boxShadow: 6 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4, gap: 3 }}>
                    <UserCardInfo username={username} photoURL={photoURL} />
                    <IncomesCard totalIncomes={totalIncomes} />
                    <ExpensesCard totalExpenses={totalExpenses} />
                    <AssetsCard totalAssets={totalAssets} />
                </Box>
                <ProfileImageSection photoURL={photoURL} />
            </Card>
        </div>
    )
}

export default Home