import { useState, useEffect } from "react"
import Image from "next/image"
import { useQuiosco } from "../context/QuioscoProvider"
import { formatearDinero } from "../helpers/"

const ModalProducto = () => {
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
    const { nombre, imagen, precio } = producto;

    useEffect(() => {
        if(pedido.some(p => p.id === producto.id)) {
            const productoEdicion = pedido.find(p => p.id === producto.id);
            setEdicion(true);
            setCantidad(productoEdicion.cantidad);
        }
    }, [producto, pedido])

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1-3">
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={nombre}
            width={300}
            height={400}
        />
      </div>
      <div className="md:w-2-3">
        <div className="flex justify-end">
            <button
                type="button"
                onClick={handleChangeModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <h2 className="text-3xl font-bold mt-5">{nombre}</h2>
        <p className="text-amber-500 mt-5 font-black text-5xl">
            {formatearDinero(precio)}
        </p>

        <div className="flex gap-3 mt-5">
            <button
                type="button"
                onClick={() => {
                    if (cantidad <= 1) return;
                    setCantidad(cantidad - 1);
                }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
            </button>
            <p className="text-2xl">
                {cantidad}
            </p>
            <button
                type="button"
                onClick={() => {
                    if(cantidad >= 10) return;
                    setCantidad(cantidad + 1)
                }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                </svg>
            </button>
        </div>

        <div className="">
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold mt-5 py-2 px-4 rounded uppercase"
                onClick={() => handleAgregarPedido({ ...producto, cantidad })}
            >
                {edicion ? 'Editar Pedido' : 'Agregar Pedido'}
            </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProducto
