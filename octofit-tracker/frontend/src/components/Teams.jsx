import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : null

const columns = [
  { key: 'name', label: 'Squadra' },
  { key: 'members', label: 'Membri' },
  { key: 'points', label: 'Punti' },
]

export default function Teams() {
  return (
    <ResourcePage
      title="Squadre"
      description="Squadre e risultati condivisi."
      resource="teams"
      endpoint={endpoint}
      columns={columns}
    />
  )
}