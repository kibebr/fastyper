export const login = async (username, password) => await fetch(
  'http://localhost:3002/auth',
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }
)
