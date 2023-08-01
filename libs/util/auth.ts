// utils/auth.js
import jwtDecode from 'jwt-decode'

interface DecodedToken {
  exp: number
  // Add other properties as needed
}

async function refreshTokenIfNeeded() {
  const idToken = localStorage.getItem('idToken')
  if (!idToken) {
    return null
  }

  const decodedToken = jwtDecode(idToken) as DecodedToken

  const currentTime = Date.now() / 1000

  if (decodedToken.exp > currentTime) {
    return idToken
  }

  // If the token is about to expire or has expired, refresh the token
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    return null
  }

  const response = await fetch('/api/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const { newIdToken } = await response.json()
  localStorage.setItem('idToken', newIdToken)

  return newIdToken
}

export async function getValidToken() {
  try {
    const token = await refreshTokenIfNeeded()
    return token
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}
