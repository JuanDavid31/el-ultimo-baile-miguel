import React from 'react';
import '../styles/loading.css'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <Box  className="loading">
      <h3 style={{color:'#ffffff'}}>Cargando...</h3>
      <CircularProgress style={{color: '#ffffff'}}/>
    </Box>
  )
}

export default Loading
