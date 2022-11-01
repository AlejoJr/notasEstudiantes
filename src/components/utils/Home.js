import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Home = () => {
  const navigate = useNavigate()

  navigate('/students')

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        marginTop={5}
      >
        <Grid marginTop={10}>
          <Typography variant='h2' component='div' gutterBottom>
            Test Tecnico
          </Typography>
        </Grid>
        <Grid marginTop={2}>
          <Typography variant='body1' gutterBottom>
            Software de prueba tecnica realizado por Alejandro Caicedo
          </Typography>
        </Grid>
        <br />
        <Grid>
          <Link to='students'>Estudiantes</Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
