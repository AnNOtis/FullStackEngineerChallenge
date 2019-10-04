export function getAssignmentContent(id) {
  try {
    return localStorage.getItem(`tmpAssignmentContent#${id}`)
  } catch (error) {
    console.error(error)
  }
}

export function setAssignmentContent(id, content) {
  try {
    return localStorage.setItem(`tmpAssignmentContent#${id}`, content)
  } catch (error) {
    console.error(error)
  }
}

export function removeAssignmentContent(id) {
  localStorage.removeItem(`tmpAssignmentContent#${id}`)
}
