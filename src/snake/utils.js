export function includesCoord(coordinates, coord) {
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i][0] === coord[0] && coordinates[i][1] === coord[1]) {
      return true
    }
  }
  return false
}
