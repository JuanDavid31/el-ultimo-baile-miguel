import React from "react"
import { Box } from '@mui/material'
import AppBar from "../components/AppBar"
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';

const Home = () => {
  const history = useNavigate()

  const goQuestions = () => {
    history('/questions') 
  }
  
  return (
    <>
      <AppBar/>
      <Box style={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'}}
      >
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ color: '#ffffff' }} variant="h3">
            ¡Hola, y bienvenida a este cuestionario!
          </Typography>
          <Button onClick={goQuestions} color="inherit" variant="contained" component="span" style={{ marginTop:'15vh' }} size="large"> 
            Empezar Test
          </Button>
        </div>
      </Box>
    </>
  )
}

export default Home

//Todo en el boton llaar al metodo que me envie correo informandome que empezo