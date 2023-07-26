import { useEffect, useCallback } from 'react'
import { useQuiosco } from '../context/QuioscoProvider'
import Layout from '../layout/layout'
import { formatearDinero } from '../helpers'

export default function Total() {
    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    useEffect(() => {
        const guardarTotal = localStorage.getItem('total')
        console.log(guardarTotal)
    }, [])

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre.trim() === '' || nombre.length < 2
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])


    return (
        <Layout pagina='Total'>
            <h1 className='text-2xl text-gray-800 font-light'>Total a pagar <span className='font-semibold'>{formatearDinero(total)}</span></h1>
            <p className='text-sm my-10'>
                Confirmar el pedido
            </p>
            <form 
                onSubmit={colocarOrden}
                className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            >
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2' htmlFor='nombre'>Nombre</label>
                    <input
                        type='text'
                        id='nombre'
                        className='bg-gray-100 shadow appearance-none border rounded w-full lg:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Nombre Cliente'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <p className='block text-gray-700 mb-2'>
                        Total a pagar {''} 
                        <span className='font-semibold'> {formatearDinero(total)}</span>
                    </p>
                </div>

                <div className='flex justify-center'>
                    <input
                        type='submit'
                        className={`bg-gray-700 w-full lg:w-auto mt-5 px-5 py-2 rounded-md text-white uppercase font-bold hover:bg-gray-800 cursor-pointer focus:outline-none focus:shadow-outline hover:shadow-2xl transition duration-5 ${comprobarPedido() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}
