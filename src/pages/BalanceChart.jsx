import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';


function BalanceChart() {
    return (
        <div style={{ marginTop: '150px' }}>
            <h2>Bilanco Grafigi</h2>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                        ],
                    },
                ]}
                width={800}
                height={600}
            />
        </div>
    )
}

export default BalanceChart