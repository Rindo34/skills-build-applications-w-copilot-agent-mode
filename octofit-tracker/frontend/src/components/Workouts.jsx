import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'Allenamento' },
  { key: 'description', label: 'Descrizione' },
  { key: 'category', label: 'Categoria' },
  { key: 'duration', label: 'Durata' },
  { key: 'difficulty', label: 'Difficoltà' },
]

export default function Workouts() {
  return <ResourcePage title="Allenamenti" description="Programmi pronti per il prossimo traguardo." resource="workouts" columns={columns} />
}