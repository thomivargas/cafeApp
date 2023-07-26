import Layout from '../layout/layout'
import { useQuiosco } from '../context/QuioscoProvider'
import Pedido from '../components/Pedido';

export default function Resumen() {
    const { pedido } = useQuiosco();

    return (
        <Layout pagina='Resumen'>
            <h1 className='text-2xl text-gray-800 font-light mb-3'>Pedido</h1>
            {pedido.length > 0 ? (
                <>
                    {pedido.map((producto) => (
                        <Pedido 
                            key={producto.id}
                            producto={producto}
                        />
                    ))}
                </>
            ) : (
                <p className='text-sm text-center border-b-2 uppercase pb-1'>Aún no has pedido tu comida! </p>
            )}
        </Layout>
    )
}
