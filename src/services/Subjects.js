const baseUrl = 'https://apibackend-node.herokuapp.com/api/v1'

/***
 * Obtener todas las Asignaturas
 * @returns {Promise<Subjects>}
 */
async function getSubjects () {
  const endpoint = `${baseUrl}/subjects/`
  const headers = { 'Content-Type': 'application/json' }
  const response = await fetch(endpoint, { headers })
  const responseJson = await response.json()

  return responseJson
}

export { getSubjects }
