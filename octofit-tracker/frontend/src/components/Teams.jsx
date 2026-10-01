import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Squadra' },
  { key: 'members', label: 'Membri' },
  { key: 'points', label: 'Punti' },
]

export default function Teams() {
  return <ResourcePage title="Squadre" description="Squadre e risultati condivisi." resource="teams" columns={columns} />
}