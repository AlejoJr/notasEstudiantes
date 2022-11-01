import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Students from './students/Students'
import Notes from './notes/Notes'
import Note from './notes/Note'
import ResponsiveAppBar from './utils/AppBar'
import Home from './utils/Home'
import NotFoundPage from './utils/NotFoundPage'

function Root () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ResponsiveAppBar />}>
            <Route index element={<Home />} />
            <Route path='students' element={<Students />} />
            <Route path='notes/:id' element={<Notes />} />
            <Route path='note/:idStu/:idSub' element={<Note />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Root
