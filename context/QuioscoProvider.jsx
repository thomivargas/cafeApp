"use client"
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ producto, setProducto ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ pedido, setPedido ] = useState([]);
    const [ nombre, setNombre ] = useState('');
    const [ total, setTotal ] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    };
    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((t, producto) => (producto.precio * producto.cantidad) + t, 0);
        setTotal(nuevoTotal);
    }, [pedido]);

    const handleClickCategoriaActual = (id) => {
        const categoria = categorias.filter(c => c.id === id);
        setCategoriaActual(categoria[0]);
        router.push(`/`)
    };

    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(p => p.id === producto.id)) {
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p);
            setPedido(pedidoActualizado);
            toast.success(`Pedido actualizado`);
        } else {    
            setPedido([...pedido, producto]);
            toast.success(`Agregado al pedido`);
        }
        setModal(false);
    };

    const handleEditarCantidad = ({categoriaId, ...producto}) => {
        if(pedido.some(p => p.id === producto.id)) {
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p);
            setPedido(pedidoActualizado);
        } else {    
            setPedido([...pedido, producto]);
        }
    }
    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(p => p.id !== id);
        setPedido(pedidoActualizado);
    };

    const colocarOrden = async (e) => {
        e.preventDefault()
       
        try{
            await axios.post('/api/ordenes', {
                nombre,
                total,
                pedido,
                fecha: Date.now().toString()
            });
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);
            toast.success('Orden colocada correctamente');
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoriaActual,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
};

export { QuioscoProvider } 
export default QuioscoContext;

export const useQuiosco = () => useContext(QuioscoContext);