import sw from "./utils/switch"
import api from "./utils/api"
import { weekly, daily } from "./core/summary"
import { highlight, unhighlight } from "./core/modifications"

import { set, get } from "./utils/chrome-storage"

api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sw({
    getSummary: ({ config = {} }) => {
      const summary = {
        weekly: weekly(
          config.startTime || "9am",
          config.endTime || "5:30pm",
          config
        ),
        daily: daily(
          config.startTime || "9am",
          config.endTime || "5:30pm",
          config
        ),
      }

      sendResponse(summary)

      set({ summary })
    },

    clickEl: ({ selector }) => {
      const el = document.querySelector(selector)
      if (el) el.click()
    },

    unhighlight: () => unhighlight(),
    highlightCategory: ({ color, day }) => highlight(color, day),
  })(message.type, message)
})
