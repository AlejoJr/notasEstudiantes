import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import { getStudents } from '../../services/Students'
import { Title, SubTitle } from '../utils/Title'

function Students () {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])

  useEffect(function () {
    getStudentsApi()
  }, [])

  const getStudentsApi = async () => {
    const studentsJson = await getStudents()
    // <<-- | O R D E N A M O S - A L F A B E T I C A M E N T E - (Aa-Zz)  |-->
    const listStudents = studentsJson.sort(function (a, b) {
      if (a.name === b.name) {
        return 0
      }
      if (a.name < b.name) {
        return -1
      }
      return 1
    })

    setStudents(listStudents)
    console.log(students)
  }

  /* const handleDeleteClick = (event, idStudent) => {
    console.log('si funciono el delete', idStudent)
  } */

  const handleEditClick = (event, idStudent) => {
    console.log('si funciono el edite', idStudent)
    navigate(`/notes/${idStudent}`)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'NOMBRES',
      width: 200
    },
    {
      field: 'lastName',
      headerName: 'APELLIDOS',
      width: 200
    },
    {
      field: 'dateOfBirth',
      headerName: 'FECHA DE NACIMIENTO',
      type: 'dateTime',
      width: 180
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      getActions: (params) => [
        <IconButton
          key={1}
          aria-label='edit-student' color='inherit'
          onClick={(event) => {
            handleEditClick(event, params.id)
          }}
        >
          <EditIcon />
        </IconButton>
        /* <IconButton
          key={2}
          aria-label='delete-student' color='inherit'
          onClick={(event) => {
            handleDeleteClick(event, params.id)
          }}
        >
          <DeleteIcon />
        </IconButton> */
      ]
    }
  ]

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        marginTop={5}
        style={{ minHeight: '70vh' }}
      >
        <Title title='ALUMNOS' />
        <SubTitle title='_' />
        <DataGrid
          sx={{ minWidth: '100vh' }}
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
          components={{
            Toolbar: GridToolbar
          }}
        />
      </Grid>
    </>
  )
}

export default Students
