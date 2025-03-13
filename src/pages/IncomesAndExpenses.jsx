import React from 'react'
import TableOfIncomesAndExpenses from '../components/TableOfIncomesAndExpenses'

function IncomesAndExpenses() {
    return (
        <>
            <div style={{ marginTop: '100px' }}>
                <h2 style={{ textAlign: 'center' }}>Hesap Hareketleri</h2>
                <TableOfIncomesAndExpenses />
            </div>


        </>
    )
}

export default IncomesAndExpenses