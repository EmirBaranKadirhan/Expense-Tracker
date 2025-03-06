import React from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import GelirHesaplama from '../components/GelirHesaplama';
import GiderHesaplama from '../components/GiderHesaplama';


function GelirGiderEkle() {
    return (
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
            <GelirHesaplama />

            <GiderHesaplama />

        </div>
    )
}

export default GelirGiderEkle