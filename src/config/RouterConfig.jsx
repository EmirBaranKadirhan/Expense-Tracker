import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import GelirGiderEkle from '../pages/GelirGiderEkle'
import IncomesAndExpenses from '../pages/IncomesAndExpenses'
import BalanceChart from '../pages/BalanceChart'
import Login from '../pages/Login'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/gelirGiderEkle' element={<GelirGiderEkle />} />
                <Route path='/balanceChart' element={<BalanceChart />} />
                <Route path='/incomesAndExpenses' element={<IncomesAndExpenses />} />
                <Route path='/balanceChart' element={<BalanceChart />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default RouterConfig