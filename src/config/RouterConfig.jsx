import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import GelirGiderEkle from '../pages/GelirGiderEkle'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/gelirGiderEkle' element={<GelirGiderEkle />} />
            </Routes>
        </div>
    )
}

export default RouterConfig