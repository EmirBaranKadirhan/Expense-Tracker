import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { db } from '../firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';

function BalanceChart() {

    const [incomesData, setIncomesData] = useState([])
    const [expensesData, setExpensesData] = useState([])

    useEffect(() => {
        const getDataFromFirebase = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'transactions'))
                console.log(querySnapshot.docs)
                const data = querySnapshot.docs.map((doc) => doc.data());
                console.log(data)
                const incomes = data.filter((item) => item.type === 'Gelir');
                const expenses = data.filter((item) => item.type === 'Gider');
                setIncomesData(incomes);
                setExpensesData(expenses);
            } catch (error) {

            }

        }
        getDataFromFirebase();
    }, [])

    const formattedIncomes = incomesData.map((item, index) => (
        {
            id: index,
            value: item.amount,
            label: item.category
        }
    ))

    const formattedExpenses = expensesData.map((item, index) => (
        {
            id: index,
            value: item.amount,
            label: item.category
        }
    ))

    return (
        <div style={{ marginTop: '100px' }}>
            <h2 style={{ textAlign: 'center' }}>Bilanco Grafigi</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '600px', }}>
                    <PieChart
                        series={[
                            {
                                data: formattedIncomes,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                            },
                        ]}
                        height={300}
                    />
                </div>
                <div style={{ width: '600px' }}>
                    <PieChart
                        series={[
                            {
                                data: formattedExpenses,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                            },
                        ]}
                        height={300}
                    />
                </div>


            </div>

        </div>
    )
}

export default BalanceChart