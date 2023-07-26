"use client"
import Image from "next/image"
import { formatearDinero } from "../helpers/"
import { useQuiosco } from "../context/QuioscoProvider"

const Producto = ({producto}) => {
    const { nombre, imagen, precio } = producto;
    const { handleSetProducto, handleChangeModal } = useQuiosco();

  return (
    <div className="flex flex-col justify-between border p-3 rounded-md">
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={nombre}
            className="rounded-md"
            width={260}
            height={360}
        />
        <div className="flex flex-col justify-between p-2 h-48 ">
            <div>
                <h3 className="text-lg font-bold">{nombre}</h3>
                <p className="text-amber-500 mt-5 font-black text-2xl">
                    {formatearDinero(precio)}
                </p>
            </div>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 w-full p-2 text-white uppercase font-bold rounded-md"
                onClick={() => {
                    handleSetProducto(producto)
                    handleChangeModal()
                }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto
