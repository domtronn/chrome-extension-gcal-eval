import { rgbToHex } from "../utils/col"
import { selectDays, selectMeetings } from "../utils/selectors"

export const highlight = (color, day) => {
  selectDays().forEach((column) => {
    selectMeetings(column).forEach((node) => {
      if (
        (!day || column.innerText.includes(day)) &&
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
  selectMeetings().forEach((node) => (node.style.opacity = 1))
