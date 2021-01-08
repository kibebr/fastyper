export const isMinLength = (len: number) => (str: string): boolean => str.length >= len 

export const isMaxLength = (len: number) => (str: string): boolean => str.length <= len

export const strHas = (str: string) => (str2: string): boolean => str.includes(str2)

export const isAlphanumeric = (str: string): boolean => /^[a-z0-9]+$/i.test(str)
