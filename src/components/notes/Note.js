import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { Grid } from '@mui/material'
import { Title } from '../utils/Title'
import { styled } from '@mui/material/styles'
import CheckIcon from '@mui/icons-material/Check'
import Button from '@mui/material/Button'
import Select from 'react-select'
import ClearIcon from '@mui/icons-material/Clear'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'

import { getNoteByStudent, createNote, updateNote } from '../../services/Notes'
import { getSubjects } from '../../services/Subjects'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '45%',
  marginTop: 50
}))

function Note () {
  const navigate = useNavigate()
  const { idStu, idSub } = useParams()
  const { handleSubmit } = useForm()

  const [isDisableSelect, setIsDisableSelect] = useState(true)
  const [isError, setIsError] = useState(false)

  const [id, setId] = useState(0)
  const [subjectId, setSubjectId] = useState('')
  const [qualification, setQualification] = useState('0')
  const [examDate, setExamDate] = useState('2022-08-16')
  const [studentId, setStudentId] = useState('')

  const [subjects, setSubjects] = useState([])
  const [obtionSelect, setObtionSelect] = useState({ label: '', value: '' })

  useEffect(function () {
    getStudentNotes()
  }, [])

  const getStudentNotes = async () => {
    const subjectsJson = await getSubjects()
    // Ordenamos por orden alfabetico a-z
    const resultSubjects = subjectsJson.sort(function (a, b) {
      if (a.name === b.name) {
        return 0
      }
      if (a.name < b.name) {
        return -1
      }
      return 1
    })

    setSubjects(resultSubjects)

    if (parseInt(idSub) > 0) {
      setIsDisableSelect(true)
      const noteJson = await getNoteByStudent(`${idStu}`, `${idSub}`)

      setQualification(noteJson[0].qualification)
      setObtionSelect({
        label: noteJson[0].nameSubject,
        value: noteJson[0].idSubject
      })
      setId(noteJson[0].id)
      setStudentId(noteJson[0].idStudent)
      setSubjectId(noteJson[0].idSubject)
      const fechita = (noteJson[0].examDate)
      const midate = new Date(fechita)
      const year = midate.toLocaleString('default', { year: 'numeric' })
      const month = midate.toLocaleString('default', { month: '2-digit' })
      const day = midate.toLocaleString('default', { day: '2-digit' })

      const formattedDate = year + '-' + month + '-' + day
      setExamDate(formattedDate)
    } else {
      setIsDisableSelect(false)
    }
  }

  // <<--| G U A R D A R - L O S - D A T O S |-->>
  const onSubmit = (data) => {
    // e.preventDefault()

    console.log('guardo datos')
    console.log(qualification)
    console.log(examDate)

    const modelNote = {
      id,
      subjectId: subjectId !== '' ? subjectId : obtionSelect.value,
      qualification,
      examDate,
      studentId: studentId !== '' ? studentId : idStu
    }

    if (idSub > 0) {
      noteApi(modelNote, 'update')
    } else {
      noteApi(modelNote, 'create')
    }
  }

  const noteApi = async (data, method) => {
    let noteJson

    if (method === 'update') {
      noteJson = await updateNote(data)
    } else {
      noteJson = await createNote(data)
    }

    console.log(noteJson.message)

    if (noteJson.message === 'Created-OK' || noteJson.message === 'Updated-OK') {
      navigate(`/notes/${idStu}`)
    } else if (noteJson === undefined) {
      console.log('Error Notas ->, ', noteJson)
      setIsError(true)
    }
  }

  // <<--| M A N E J A R - E L - C A M B I O ) |-->>
  const changeSelectSubjects = async (event) => {
    const option = event
    console.log(option)
    setObtionSelect(option)
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        direction='column'
        alignItems='center'
        marginTop={5}
      >
        <Title title='NOTA' />
        <Item>
          <form className='row-cols-1' onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              justifyContent='center'
              style={{ minHeight: '30vh' }}
            >

              <Grid item xs={4} marginTop={2} marginLeft={1}>
                <Select
                  placeholder='Asignatura'
                  isDisabled={isDisableSelect}
                  labelId='id-select-label-22'
                  id='id_SelectAsignatura'
                  value={obtionSelect}
                  options={subjects}
                  onChange={changeSelectSubjects}
                />
              </Grid>
              <Grid item xs={2} marginTop={2} marginLeft={1}>
                <TextField
                  id='id_qualification'
                  name='qualification'
                  label='Calificacion'
                  size='small'
                  type='number'
                  value={qualification}
                  variant='outlined'
                  className='form-control'
                  onChange={(e) => setQualification(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={4} marginTop={2}>
                <TextField
                  id='id_examDate'
                  name='examdate'
                  label='Fecha de examen'
                  size='small'
                  type='date'
                  value={examDate}
                  variant='outlined'
                  className='form-control'
                  onChange={(e) => setExamDate(e.currentTarget.value)}
                />
              </Grid>

              <Grid
                container
                spacing={1}
                marginTop={1}
                marginBottom={1}
              >
                <Grid item xs={6}>
                  <Button size='small' startIcon={<CheckIcon />} type='submit'>
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size='small' startIcon={<ClearIcon />}
                    onClick={() => {
                      navigate(`/notes/${idStu}`)
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={6} marginTop={2} marginBottom={2}>
                {isError &&
                  <Alert severity='error'>
                    Ha ocurrido un error
                  </Alert>}
              </Grid>

            </Grid>
          </form>

        </Item>
      </Grid>

    </>
  )
}

export default Note
