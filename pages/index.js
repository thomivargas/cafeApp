import Layout from "../layout/layout"
import { useQuiosco } from "../context/QuioscoProvider"
import Producto from "../components/Producto";

export default function Home() {

  const { categoriaActual } = useQuiosco();
  return (
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className="text-3xl font-black mb-5">{categoriaActual?.nombre}</h1>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}

