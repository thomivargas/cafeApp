import Image from "next/image";
import { formatearDinero } from "../helpers/"
import axios from "axios";


const Orden = ({orden}) => {
    const { id, total, nombre, pedido, fecha } = orden;

    const confirmarEntrega = async () => {
        try {
            await axios.post(`api/ordenes/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="shadow-md w-full p-10 space-y-5 mt-5">
      <h3 className="text-2xl font-semibold">Orden: {id}</h3>
      <p className="text-gray-500">cliente: {nombre}</p>
      <div>
        {pedido.map( platillo => (
            <div key={platillo.id} className="flex py-3 border-b last-of-type:border-0 items-center">
              <div className="w-32">
                <Image 
                  src={`/assets/img/${platillo.imagen}.jpg`}
                  alt="imagen platillo"
                  width={400}
                  height={500}
                />
              </div>
              <div className='p-5 space-y-2'>
                <h4 className="text-xl font-semibold">{platillo.nombre}</h4>
                <p className="text-lg text-gray-500">Cantidad: {platillo.cantidad}</p>
              </div>
            </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="text-gray-800 font-semibold">Total a pagar: <span className="font-normal">{formatearDinero(total)}</span></p>
        <button 
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-4 rounded-md shadow-md font-semibold"
          type="button"
          onClick={() => confirmarEntrega()}
        >
          Orden lista
        </button>
      </div>
    </div>
  )
}

export default Orden
