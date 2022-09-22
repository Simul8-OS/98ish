export const revealed = (arr, x, y, newNonMinesCount) => {
  //Seen it? Return!
  if (arr[x][y].revealed) return

  let flipped = []
  flipped.push(arr[x][y])

  while (flipped.length !== 0) {
    let single = flipped.pop()

    if (!single.revealed) {
      newNonMinesCount--
      single.revealed = true
    }

    if (single.value !== 0) {
      break
    }

    //Top left
    if (
      single.x > 0 &&
      single.y > 0 &&
      arr[single.x - 1][single.y - 1].value === 0 &&
      !arr[single.x - 1][single.y - 1].revealed
    ) {
      flipped.push(arr[single.x - 1][single.y - 1])
    }
    if (
      single.x < arr.length - 1 &&
      single.y < arr[0].length - 1 &&
      arr[single.x + 1][single.y + 1].value === 0 &&
      !arr[single.x + 1][single.y + 1].revealed
    ) {
      flipped.push(arr[single.x + 1][single.y + 1])
    }
    if (
      single.x < arr.length - 1 &&
      single.y > 0 &&
      arr[single.x + 1][single.y - 1].value === 0 &&
      !arr[single.x + 1][single.y - 1].revealed
    ) {
      flipped.push(arr[single.x + 1][single.y - 1])
    }
    if (
      single.x > 0 &&
      single.y < arr[0].length - 1 &&
      arr[single.x - 1][single.y + 1].value === 0 &&
      !arr[single.x - 1][single.y + 1].revealed
    ) {
      flipped.push(arr[single.x - 1][single.y + 1])
    }

    // Single ones
    if (
      single.x > 0 &&
      arr[single.x - 1][single.y].value === 0 &&
      !arr[single.x - 1][single.y].revealed
    ) {
      flipped.push(arr[single.x - 1][single.y])
    }
    if (
      single.x < arr.length - 1 &&
      arr[single.x + 1][single.y].value === 0 &&
      !arr[single.x + 1][single.y].revealed
    ) {
      flipped.push(arr[single.x + 1][single.y])
    }
    if (
      single.y > 0 &&
      arr[single.x][single.y - 1].value === 0 &&
      !arr[single.x][single.y - 1].revealed
    ) {
      flipped.push(arr[single.x][single.y - 1])
    }
    if (
      single.y < arr[0].length - 1 &&
      arr[single.x][single.y + 1].value === 0 &&
      !arr[single.x][single.y + 1].revealed
    ) {
      flipped.push(arr[single.x][single.y + 1])
    }

    // Start Revealing Items
    if (
      single.x > 0 &&
      single.y > 0 &&
      !arr[single.x - 1][single.y - 1].revealed
    ) {
      //Top Left Reveal

      arr[single.x - 1][single.y - 1].revealed = true
      newNonMinesCount--
    }

    if (single.y > 0 && !arr[single.x][single.y - 1].revealed) {
      // Top Reveal
      arr[single.x][single.y - 1].revealed = true
      newNonMinesCount--
    }

    if (
      single.x < arr.length - 1 &&
      single.y > 0 &&
      !arr[single.x + 1][single.y - 1].revealed
    ) {
      //Top Right Reveal
      arr[single.x + 1][single.y - 1].revealed = true
      newNonMinesCount--
    }

    if (single.x > 0 && !arr[single.x - 1][single.y].revealed) {
      //Left Reveal
      arr[single.x - 1][single.y].revealed = true
      newNonMinesCount--
    }

    if (single.x < arr.length - 1 && !arr[single.x + 1][single.y].revealed) {
      // Right Reveal
      arr[single.x + 1][single.y].revealed = true
      newNonMinesCount--
    }

    if (
      single.x > 0 &&
      single.y < arr[0].length - 1 &&
      !arr[single.x - 1][single.y + 1].revealed
    ) {
      // Bottom Left Reveal
      arr[single.x - 1][single.y + 1].revealed = true
      newNonMinesCount--
    }

    if (single.y < arr[0].length - 1 && !arr[single.x][single.y + 1].revealed) {
      //Bottom Reveal
      arr[single.x][single.y + 1].revealed = true
      newNonMinesCount--
    }

    if (
      single.x < arr.length - 1 &&
      single.y < arr[0].length - 1 &&
      !arr[single.x + 1][single.y + 1].revealed
    ) {
      // Bottom Right Reveal
      arr[single.x + 1][single.y + 1].revealed = true
      newNonMinesCount--
    }
  }

  return { arr, newNonMinesCount }
}
