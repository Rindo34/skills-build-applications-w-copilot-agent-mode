import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'rank', label: 'Posizione' },
  { key: 'user', label: 'Atleta' },
  { key: 'team', label: 'Squadra' },
  { key: 'points', label: 'Punti' },
]

export default function Leaderboard() {
  return <ResourcePage title="Classifica" description="I punteggi più alti del momento." resource="leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}