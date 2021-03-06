export const rgbToHex = (rgbString) => {
  if (!rgbString) return null

  var [r, g, b] = rgbString
    .slice(4, -1)
    .split(/, ?/)
    .map((i) => +i)
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const adjustCol = (col, amt) => {
  var usePound = false

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }

  var num = parseInt(col, 16) || 0

  var r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  var b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  var g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}
