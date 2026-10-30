import { useEffect, useState, type SubmitEvent } from 'react'
import { apiUrl } from './api'

type Cuenta = {
  id: number
  codigo: number
  nombre: string
  naturaleza: 'DEBITO' | 'CREDITO'
}

const inputClass = 'border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'

async function obtenerCuentas(): Promise<Cuenta[]> {
  const respuesta = await fetch(apiUrl('/cuenta'))
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
  return respuesta.json()
}

type Estado =
  | { tipo: 'cargando' }
  | { tipo: 'ok'; cuentas: Cuenta[] }
  | { tipo: 'error'; mensaje: string }

function App() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'cargando' })
  const cuentas = estado.tipo === 'ok' ? estado.cuentas : []
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [naturaleza, setNaturaleza] = useState<Cuenta['naturaleza']>('DEBITO')
  const [errorForm, setErrorForm] = useState<string | null>(null)

  useEffect(() => {
    obtenerCuentas()
      .then((cuentas) => setEstado({ tipo: 'ok', cuentas }))
      .catch((error: Error) => setEstado({ tipo: 'error', mensaje: error.message }))
  }, [])

  async function crearCuenta(e: SubmitEvent) {
    e.preventDefault()
    setErrorForm(null)
    try {
      const respuesta = await fetch(apiUrl('/cuenta'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: Number(codigo), nombre, naturaleza }),
      })
      if (!respuesta.ok) {
        const { message } = await respuesta.json().catch(() => ({ message: `HTTP ${respuesta.status}` }))
        setErrorForm(Array.isArray(message) ? message.join(', ') : message)
        return
      }
      setEstado({ tipo: 'ok', cuentas: await obtenerCuentas() })
      setCodigo('')
      setNombre('')
    } catch (error) {
      setErrorForm((error as Error).message)
    }
  }

  return (
    <main className="flex items-center justify-center h-screen flex-col gap-6">
      <h1 className="text-2xl font-bold">Aravia</h1>

      <p>Software Contable</p>

      <form onSubmit={crearCuenta} className="flex flex-row gap-4">

        <input className={inputClass} type="number" placeholder="codigo" min={1} max={999999} required
          value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <input className={inputClass} type="text" placeholder="Nombre" required
          value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <select className={inputClass} value={naturaleza}
          onChange={(e) => setNaturaleza(e.target.value as Cuenta['naturaleza'])}>
          <option value="DEBITO">DEBITO</option>
          <option value="CREDITO">CREDITO</option>
        </select>

        <button className='border bg-gray-300 text-black px-5 rounded-md' type="submit">Enviar</button>

      </form>

      {errorForm && <p className="text-red-600">{errorForm}</p>}

      <ul>
        {
          cuentas.map((cuenta) => (
            <li key={cuenta.id}>
              {cuenta.codigo} - {cuenta.nombre} - {cuenta.naturaleza}
            </li>
          ))
        }
      </ul>

      {estado.tipo === 'cargando' && <p>Consultando la API...</p>}
      {estado.tipo === 'ok' && cuentas.length === 0 && <p>No hay cuentas registradas.</p>}
      {estado.tipo === 'error' && (
        <p>
          No se pudo hablar con la API ({estado.mensaje}). Revisa que esté
          corriendo en {apiUrl('')}.
        </p>
      )}
    </main>
  )
}

export default App
