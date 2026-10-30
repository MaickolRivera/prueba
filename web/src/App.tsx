import { useEffect, useState } from 'react'
import { apiUrl } from './api'

type Estado =
  | { tipo: 'cargando' }
  | { tipo: 'ok'; mensaje: string }
  | { tipo: 'error'; mensaje: string }

function App() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'cargando' })

  useEffect(() => {
    fetch(apiUrl('/'))
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        return respuesta.text()
      })
      .then((mensaje) => setEstado({ tipo: 'ok', mensaje }))
      .catch((error: Error) => setEstado({ tipo: 'error', mensaje: error.message }))
  }, [])

  return (
    <main className="flex items-center justify-center h-screen flex-col gap-6">
      <h1 className="text-2xl font-bold">Aravia</h1>

      <p>Software Contable</p>

      <form action="" method="post" className="flex flex-row gap-4">

        <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="codigo" />
        <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Nombre" />

        <button className='border bg-gray-300 text-black px-5 rounded-md' type="submit">Enviar</button>

      </form>

      {}

      {estado.tipo === 'cargando' && <p>Consultando la API...</p>}
      {estado.tipo === 'ok' && <p>La API respondió: {estado.mensaje}</p>}
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
