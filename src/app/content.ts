import sw from './utils/switch'
import { weekly, daily } from './core/summary'
import { highlight, unhighlight } from './core/modifications'

import { set, get } from './utils/chrome-storage'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sw({
    getSummary: ({ config = {} }) => {
      const summary = {
        weekly: weekly(config.startTime || '9am', config.endTime || '5:30pm', config),
        daily: daily(config.startTime || '9am', config.endTime || '5:30pm', config)
      }

      sendResponse(summary)

      set({ summary })

    },

    unhighlight: unhighlight,
    highlightCategory: ({ color, day }) => highlight(color, day)

  })(message.type, message)
})
