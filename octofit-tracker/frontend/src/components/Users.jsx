import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'displayName', label: 'Nome' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Squadra' },
  { key: 'points', label: 'Punti' },
]

export default function Users() {
  return <ResourcePage title="Atleti" description="Profili e progressi della community." resource="users" endpoint="/api/users/" columns={columns} />
}