import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Students from './students/Students'
import Notes from './notes/Notes'
import Note from './notes/Note'

function Root () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Students />} />
          <Route path='notes/:id' element={<Notes />} />
          <Route path='note/:idStu/:idSub' element={<Note />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Root
