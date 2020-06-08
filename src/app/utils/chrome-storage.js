import api from "./api"

export const clear = (key, cb = () => {}) =>
  api.storage.sync.set({ [key]: undefined }, cb)
export const set = (o, cb = () => {}) => api.storage.sync.set(o, cb)
export const get = (key, cb = () => {}) => api.storage.sync.get([key], cb)
