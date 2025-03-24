import React from 'react'
import { Card, Typography, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function ExpensesCard({ totalExpenses }) {
    return (
        <div>
            <Card
                sx={{
                    backgroundColor: '#ffebee',
                    borderRadius: 3,
                    padding: 2,
                    '&:hover': { boxShadow: 4 }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingDownIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: '#c62828' }}>Toplam Gider</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>
                            {totalExpenses} ₺
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </div>
    )
}

export default ExpensesCard