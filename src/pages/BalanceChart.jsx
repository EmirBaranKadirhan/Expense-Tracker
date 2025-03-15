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

                // kategorilere gore gruplama ve toplama
                const groupedIncomes = groupAndSumByCategory(incomes);
                console.log(groupedIncomes)
                const groupedExpenses = groupAndSumByCategory(expenses);

                setIncomesData(groupedIncomes);
                setExpensesData(groupedExpenses);

            } catch (error) {
                console.log(`Error fetching data`, error)
            }

        }
        getDataFromFirebase();
    }, [])

    const groupAndSumByCategory = (data) => {
        return data.reduce((acc, item) => {
            const category = item.category;             // data'dan gelen kategori turlerini aldi
            if (!acc[category]) {                       // burada kontrol yapariz ve oncesinde bu kategori yoksa olusturdu ve degerini 0 yaptik
                acc[category] = { category, amount: 0 }
            }
            acc[category].amount += item.amount;        // kategori oncesinde varsa  degerini guncelledi
            return acc;
        }, {})
    }

    const formatDataForChart = (groupedData) => {
        return Object.values(groupedData).map((item, index) => ({
            id: index,
            value: item.amount,
            label: item.category,
            color: `var(--income-color-${index}, #${Math.floor(Math.random() * 16777215).toString(16)})`
        }))
    }

    const formattedIncomes = formatDataForChart(incomesData);
    const formattedExpenses = formatDataForChart(expensesData);

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