"use client"
import Image from "next/image"
import { useQuiosco } from "../context/QuioscoProvider"
import Categoria from "./Categoria"

const Sidebar = () => {
  const { categorias } = useQuiosco()
  return (
    <div className="flex flex-col justify-center mt-10">
        <Image width={300} height={100} src="/assets/img/logo.svg" alt="imagen logo"/>

        <nav className="mt-10 list-none">
            {categorias.map(categoria => (
              <Categoria
                key={categoria.id}
                categoria={categoria}
              />
            ))}
        </nav>
    </div>
  )
}

export default Sidebar
