import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : null

const columns = [
  { key: 'displayName', label: 'Nome' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Squadra' },
  { key: 'points', label: 'Punti' },
]

export default function Users() {
  return (
    <ResourcePage
      title="Atleti"
      description="Profili e progressi della community."
      resource="users"
      endpoint={endpoint}
      columns={columns}
    />
  )
}