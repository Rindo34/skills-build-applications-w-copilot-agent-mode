import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '-'
  if (Array.isArray(value)) return value.map(displayValue).join(', ')
  if (typeof value === 'object') {
    return displayValue(value.displayName ?? value.username ?? value.name ?? value.title ?? value._id)
  }
  return String(value)
}

export default function ResourcePage({ title, description, resource, columns }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, controller.signal)
      .then(setItems)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [resource])

  return (
    <section aria-labelledby={`${resource}-heading`}>
      <header className="page-heading">
        <h1 id={`${resource}-heading`}>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="data-surface">
        {loading ? (
          <p className="empty-state" role="status">Caricamento...</p>
        ) : error ? (
          <p className="empty-state" role="alert">
            {!API_BASE_URL
              ? <>{error} Aggiungi la variabile in <code>.env.local</code> e riavvia Vite.</>
              : error}
          </p>
        ) : items.length === 0 ? (
          <p className="empty-state">Nessun dato disponibile.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>{displayValue(item[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}