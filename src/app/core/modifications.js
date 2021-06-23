import sw from "../utils/switch"
import { rgbToHex } from "../utils/col"
import {
  selectDays,
  selectAllMeetings,
  selectHeaders,
} from "../utils/selectors"

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

export const appendSummary = (summary) => {
  selectHeaders().forEach((node, i) => {
    const childNode = node.querySelector(".gcaleval")
    if (childNode) node.removeChild(childNode)

    const {
      time: { cH, cM },
    } = summary.daily[i].summary[0]

    const div = document.createElement("div")

    const hrText = sw({
      0: "",
      1: "1hr",
      default: `${cH}hrs`,
    })(cH)

    const minsText = sw({
      0: "",
      1: "1min",
      default: `${cM}mins`,
    })(cM)

    const timeText = [hrText, minsText].filter((i) => i).join(" ")

    div.innerText = `Free time ${timeText}`
    div.classList.add("gcaleval")

    node.appendChild(div)
  })
}
