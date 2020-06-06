import sw from './utils/switch'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const data = {
    summary: {}
  }

  sw({
    getSummary: () => sendResponse(data.summary),
    setSummary: () => (data.summary = message.summary),
    default: () => console.error('Did not understand message:', message)
  })(message.type)
})
