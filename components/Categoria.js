import Image from "next/image"
import { useQuiosco } from "../context/QuioscoProvider"

const Categoria = ({categoria}) => {
    const { categoriaActual, handleClickCategoriaActual } = useQuiosco();
    const { nombre, icono, id } = categoria;

  return (
    <button 
        type="button"
        className={`${categoriaActual?.id === id ? 'bg-amber-400 hover:bg-amber-400' : 'hover:bg-amber-100'} flex items-center gap-4 w-full border p-4 cursor-pointer font-bold `}
        onClick={() => handleClickCategoriaActual(id)}
    >
        <Image 
            width={80} 
            height={80} 
            src={`/assets/img/icono_${icono}.svg`} 
            alt="imagen logo"
        />
        {nombre}
    </button>
  )
}

export default Categoria
