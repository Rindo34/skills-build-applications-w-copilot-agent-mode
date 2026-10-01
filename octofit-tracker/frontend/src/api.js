const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : null

export async function fetchCollection(endpoint, signal) {
  if (!API_BASE_URL) {
    throw new Error('Configura VITE_CODESPACE_NAME per collegarti all\'API.')
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Richiesta non riuscita (${response.status}).`)
  }

  const payload = await response.json()
  return normalizeCollection(payload)
}

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload

  let value = payload
  while (value && !Array.isArray(value)) {
    if (Array.isArray(value.results)) return value.results
    if (Array.isArray(value.items)) return value.items
    if (Array.isArray(value.data)) return value.data
    value = value.data
  }

  return []
}