import React from 'react'
import { Card, Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function IncomesCard({ totalIncomes }) {
    return (
        <div>
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
        </div>
    )
}

export default IncomesCard