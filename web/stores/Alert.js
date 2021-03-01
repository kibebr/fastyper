import { writable } from 'svelte/store'

const createMessageStore = timeout => {
  const { subscribe, set } = writable(null)
  let timer = null

  return {
    subscribe,
    addAlert: (type, error) => {
      clearTimeout(timer)
      set({ type, error })
      timer = setTimeout(() => set(null), timeout)
    }
  }
}

export const message = createMessageStore(3000)
