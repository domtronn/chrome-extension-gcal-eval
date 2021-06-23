import sw from "./utils/switch"
import api from "./utils/api"
import { weekly, daily } from "./core/summary"
import { highlight, unhighlight, appendSummary } from "./core/modifications"

import { set, get } from "./utils/chrome-storage"

const getSummary = ({ config = {}, sendResponse }) => {
  const summary = {
    weekly: weekly(
      config.startTime || "9am",
      config.endTime || "5:30pm",
      config
    ),
    daily: daily(config.startTime || "9am", config.endTime || "5:30pm", config),
  }

  sendResponse && sendResponse(summary)
  // TODO: Implement appending daily summary to columns
  // appendSummary(summary)

  set({ summary })
}

/** Get & append summary onload */
get("config", ({ config } = {}) => getSummary({ config }))

api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sw({
    getSummary: ({ config = {} }) => getSummary({ config, sendResponse }),
    clickEl: ({ selector }) => {
      const el = document.querySelector(selector)
      if (el) el.click()
    },

    unhighlight: () => unhighlight(),
    highlightCategory: ({ color, day }) => highlight(color, day),
  })(message.type, message)
})
