import React, { useEffect, useRef } from 'react'
// import Select from 'react-select'
// import { getSubjects } from '../../services/Subjects'

function MyComponent () {
  const inputRef = useRef()
  // const [subjects, setSubjects] = useState([])
  // const [obtionSelect, setObtionSelect] = useState(0)

  useEffect(function () {
    getStudentNotes()
  }, [])

  const getStudentNotes = async () => {
    // const subjectsJson = await getSubjects()
    // setSubjects(subjectsJson)
  }

  const formSubmitHandler = e => {
    e.preventDefault()
    console.log('Email: ' + inputRef.current.value)
  }
  return (
    <div className='App'>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' id='email' ref={inputRef} />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default MyComponent
