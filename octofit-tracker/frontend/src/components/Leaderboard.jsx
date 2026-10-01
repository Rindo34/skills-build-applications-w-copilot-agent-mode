import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : null

const columns = [
  { key: 'rank', label: 'Posizione' },
  { key: 'user', label: 'Atleta' },
  { key: 'team', label: 'Squadra' },
  { key: 'points', label: 'Punti' },
]

export default function Leaderboard() {
  return (
    <ResourcePage
      title="Classifica"
      description="I punteggi più alti del momento."
      resource="leaderboard"
      endpoint={endpoint}
      columns={columns}
    />
  )
}