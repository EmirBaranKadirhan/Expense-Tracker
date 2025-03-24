import React from 'react'
import { Card, Typography } from '@mui/material';

function AssetsCard({ totalAssets }) {
    const isPositiveAssets = totalAssets >= 0;
    return (
        <div>
            <Card
                sx={{
                    backgroundColor: isPositiveAssets ? '#e3f2fd' : '#fce4ec',
                    borderRadius: 3,
                    padding: 2,
                    mt: 1,
                    borderLeft: `6px solid ${isPositiveAssets ? '#2196f3' : '#f06292'}`,
                }}
            >
                <Typography variant="subtitle1" sx={{ color: isPositiveAssets ? '#1976d2' : '#c2185b' }}>
                    {isPositiveAssets ? 'Kârdasınız' : 'Zarardasınız'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: isPositiveAssets ? '#0d47a1' : '#880e4f' }}>
                    {totalAssets} ₺
                </Typography>
            </Card>
        </div>
    )
}

export default AssetsCard