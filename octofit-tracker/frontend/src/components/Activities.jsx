import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : null

const columns = [
  { key: 'user', label: 'Utente' },
  { key: 'activityType', label: 'Attività' },
  { key: 'durationMinutes', label: 'Durata (min)' },
  { key: 'distanceKm', label: 'Distanza (km)' },
  { key: 'calories', label: 'Calorie' },
  { key: 'recordedAt', label: 'Registrata il' },
]

export default function Activities() {
  return (
    <ResourcePage
      title="Attività"
      description="Attività registrate dalla community."
      resource="activities"
      endpoint={endpoint}
      columns={columns}
    />
  )
}