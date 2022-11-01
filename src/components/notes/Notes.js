import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'

import { getNotesByStudent, deleteNote } from '../../services/Notes'
import { Title, SubTitle } from '../utils/Title'

function Notes () {
  const navigate = useNavigate()
  const [nameStudent, setNameStudent] = useState('')
  const [notes, setNotes] = useState([])

  const { id } = useParams()

  useEffect(function () {
    getStudentNotes()
  }, [])

  const getStudentNotes = async () => {
    const studentNotesJson = await getNotesByStudent(`${id}`)
    // <<-- | O R D E N A M O S - A L F A B E T I C A M E N T E - (Aa-Zz)  |-->
    const listNotes = studentNotesJson.sort(function (a, b) {
      if (a.name === b.name) {
        return 0
      }
      if (a.name < b.name) {
        return -1
      }
      return 1
    })

    setNotes(listNotes)

    if (listNotes.length > 0) {
      setNameStudent(listNotes[0].nameStudent + ' ' + listNotes[0].lastName)
    }
  }

  const handleDeleteClick = async (event, id) => {
    await deleteNote(id)
    const listNotess = notes.filter(el => el.id !== id)
    setNotes(listNotess)
  }

  const handleEditClick = (event, idStudent, idSubject) => {
    navigate(`/note/${idStudent}/${idSubject}`)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'idSubject',
      headerName: 'Id asignatura',
      width: 200,
      hide: true
    },
    {
      field: 'nameSubject',
      headerName: 'ASIGNATURA',
      width: 200
    },
    {
      field: 'qualification',
      headerName: 'CALIFICACIÓN',
      width: 180
    },
    {
      field: 'examDate',
      headerName: 'FECHA DE EXAMEN',
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
            handleEditClick(event, params.row.idStudent, params.row.idSubject)
          }}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          key={2}
          aria-label='delete-student' color='inherit'
          onClick={(event) => {
            handleDeleteClick(event, params.row.id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      ]
    }
  ]

  const newNote = (event) => {
    if (event.currentTarget.id === 'createNote') {
      navigate(`/note/${id}/${0}`)
    }
  }

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
        <Title title='NOTAS' />
        <SubTitle title={nameStudent} />
        <Button
          variant='outlined'
          id='createNote'
          onClick={newNote}
        >Alta Nota
        </Button>
        <DataGrid
          sx={{ minWidth: '100vh' }}
          rows={notes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
          components={{
            Toolbar: GridToolbar
          }}
        />
        <Grid item xs={6}>
          <Button
            size='small' startIcon={<ClearIcon />}
            onClick={() => {
              navigate('/')
            }}
          >
            Cancelar
          </Button>
        </Grid>

      </Grid>
    </>
  )
}

export default Notes
