import React from 'react'
import { Box, Avatar, Typography } from '@mui/material';

export default function UserCardInfo({ username, photoURL }) {
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={photoURL} sx={{ width: 60, height: 60 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{username}</Typography>
            </Box>
        </div>
    )
}
