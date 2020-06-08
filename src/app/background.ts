import sw from './utils/switch'
import api from './utils/api'

api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const data = {
    summary: {}
  }

  sw({
    getSummary: () => sendResponse(data.summary),
    setSummary: () => (data.summary = message.summary),
    default: () => console.error('Did not understand message:', message)
  })(message.type)
})
