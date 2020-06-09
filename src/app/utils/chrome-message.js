import api from "./api"

export const sendMessage = (msg, f) => {
  api.tabs.query({ active: true, currentWindow: true }, ([tabs]) => {
    api.tabs.sendMessage(tabs.id, msg, f)
  })
}

export const currentTab = (f) => {
  api.tabs.query({ active: true, currentWindow: true }, ([tab, ...rest]) => {
    f(tab)
  })
}
