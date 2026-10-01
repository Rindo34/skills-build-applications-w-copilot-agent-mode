import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'user', label: 'Utente' },
  { key: 'activityType', label: 'Attività' },
  { key: 'durationMinutes', label: 'Durata (min)' },
  { key: 'distanceKm', label: 'Distanza (km)' },
  { key: 'calories', label: 'Calorie' },
  { key: 'recordedAt', label: 'Registrata il' },
]

export default function Activities() {
  return <ResourcePage title="Attività" description="Attività registrate dalla community." resource="activities" endpoint="/api/activities/" columns={columns} />
}