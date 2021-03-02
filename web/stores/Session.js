import { writable } from 'svelte/store'

export const getCurrentSession = () => window.localStorage.getItem('session')

export const setCurrentSession = data => window.localStorage.setItem('session', JSON.stringify(data))

const { subscribe, set } = writable(JSON.parse(getCurrentSession()))
subscribe(setCurrentSession)

export const session = {
  subscribe,
  set: data => { const parsed = JSON.parse(data); setCurrentSession(parsed) }
}
