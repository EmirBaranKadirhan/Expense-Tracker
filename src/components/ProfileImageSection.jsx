import React from 'react'
import { Box, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router'

function ProfileImageSection({ photoURL }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/profileEdit')
    }
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 1 }}>
                {photoURL && (
                    <CardMedia
                        component="img"
                        sx={{ width: '400px', objectFit: 'cover', height: '375px' }}
                        image={photoURL}
                        alt="Profil Fotoğrafı"
                    />
                )}
                <Button variant="contained" color="secondary" onClick={handleNavigate}>
                    Profil Düzenle
                </Button>
            </Box>
        </div>
    )
}

export default ProfileImageSection