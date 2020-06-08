/* global chrome browser */

const apis = ["runtime", "storage", "tabs"]

function Extension() {
  const Api = {}

  apis.forEach((api) => {
    console.log(Api, api)
    Api[api] = null

    try {
      if (chrome[api]) {
        Api[api] = chrome[api]
      }
    } catch (e) {}

    try {
      if (window[api]) {
        Api[api] = window[api]
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        Api[api] = browser[api]
      }
    } catch (e) {}
    try {
      Api.api = browser.extension[api]
    } catch (e) {}
  })

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction
    }
  } catch (e) {}

  return Api
}

export default Extension()
