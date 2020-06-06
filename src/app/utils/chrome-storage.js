/* global chrome */
export const clear = (key, cb = () => {}) => chrome.storage.sync.set({ [key]: undefined }, cb)
export const set = (o, cb = () => {}) => chrome.storage.sync.set(o, cb)
export const get = (key, cb = () => {}) => chrome.storage.sync.get([key], cb)
