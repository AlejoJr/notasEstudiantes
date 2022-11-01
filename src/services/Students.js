const baseUrl = 'https://apibackend-node.herokuapp.com/api/v1'

/***
 * Obtener todos los Estudiantes
 * @returns {Promise<Students>}
 */
async function getStudents () {
  const endpoint = `${baseUrl}/students/`
  const headers = { 'Content-Type': 'application/json' }
  const response = await fetch(endpoint, { headers })
  const responseJson = await response.json()

  return responseJson
}

export { getStudents }
