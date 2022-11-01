const baseUrl = 'https://apibackend-node.herokuapp.com/api/v1'

/***
 * Obtener todas las notas de un estudiante
 * @returns {Promise<Notes>}
 */
async function getNotesByStudent (id) {
  const endpoint = `${baseUrl}/notes/${id}`
  const headers = { 'Content-Type': 'application/json' }
  const response = await fetch(endpoint, { headers })
  const responseJson = await response.json()

  return responseJson
}

/***
 * Obtener todas una nota del estudiante
 * @returns {Promise<Note>}
 */
async function getNoteByStudent (idStu, idSub) {
  console.log('servicio params ', idStu, idSub)
  const endpoint = `${baseUrl}/notes/${idStu}/${idSub}`
  const headers = { 'Content-Type': 'application/json' }
  const response = await fetch(endpoint, { headers })
  const responseJson = await response.json()

  return responseJson
}

/***
 * Crear un nueva Nota
 * @param note
 * @returns {Promise<Note>}
 */
async function createNote (note) {
  const endpoint = `${baseUrl}/notes/`

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  }

  const responseJson = fetch(endpoint, requestOptions)
    .then(response => {
      if (response.ok) {
        if (response.status === 226) {
          return 'Im Used'
        } else {
          return response.json()
        }
      } else {
        throw new Error(response.status)
      }
    })
    .catch(error => console.log('Error creando la Nota -> ', error))

  return responseJson
}

/***
 * Actualizar La Nota
 * @param note
 * @returns {Promise<Note>}
 */
async function updateNote (note) {
  const endpoint = `${baseUrl}/notes/${note.studentId}/${note.subjectId}`
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  }

  const responseJson = fetch(endpoint, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status)
      }
    })
    .catch(error => console.log('Error actualizando la Nota -> ', error))

  return responseJson
}

/***
 * Eliminar la nota
 * @param idNote
 * @returns {Promise<Note>}
 */
async function deleteNote (idNote) {
  const endpoint = `${baseUrl}/notes/${idNote}`
  const headers = { 'Content-Type': 'application/json' }
  const response = await fetch(endpoint, { method: 'delete', headers })
  const responseJson = await response.json()
  return responseJson
}

export { getNotesByStudent, getNoteByStudent, createNote, updateNote, deleteNote }
