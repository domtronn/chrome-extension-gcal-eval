import sw from './utils/switch'
import { weekly, daily } from './core/summary'
import { highlight, unhighlight } from './core/modifications'

import { set } from './utils/chrome-storage'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sw({
    getSummary: () => {
      console.log('received getSummary request')
      const summary = {
        weekly: weekly('9am', '5pm'),
        daily: daily('9am', '5pm')
      }

      set({ summary })
      sendResponse(summary)
    },

    unhighlight: () => {
      console.log('received to unhighlight request')
      unhighlight()
    },

    highlightCategory: ({ color, day }) => {
      console.log('received highlight request for', color, day)
      highlight(color, day)
    }
  })(message.type, message)
})
