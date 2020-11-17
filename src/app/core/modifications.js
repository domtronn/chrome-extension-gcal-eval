import { rgbToHex } from "../utils/col"
import { selectDays, selectAllMeetings } from "../utils/selectors"

export const highlight = (color, day) => {
  selectDays().forEach((column) => {
    selectAllMeetings(column).forEach((node) => {
      if (
        (day === "All days" || column.innerText.includes(day)) &&
        rgbToHex(node.style["background-color"]) === color
      ) {
        node.style.opacity = 1
      } else {
        node.style.opacity = 0.2
      }
    })
  })
}

export const unhighlight = () =>
  selectAllMeetings().forEach((node) => (node.style.opacity = 1))
