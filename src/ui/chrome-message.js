/* global chrome */
export const sendMessage = (msg, f) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tabs]) => {
    chrome.tabs.sendMessage(tabs.id, msg, f)
  })
}
