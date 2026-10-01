import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : null

const columns = [
  { key: 'name', label: 'Allenamento' },
  { key: 'description', label: 'Descrizione' },
  { key: 'category', label: 'Categoria' },
  { key: 'duration', label: 'Durata' },
  { key: 'difficulty', label: 'Difficoltà' },
]

export default function Workouts() {
  return (
    <ResourcePage
      title="Allenamenti"
      description="Programmi pronti per il prossimo traguardo."
      resource="workouts"
      endpoint={endpoint}
      columns={columns}
    />
  )
}