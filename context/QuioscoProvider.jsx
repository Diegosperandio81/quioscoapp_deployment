import { useState, useEffect, createContext  } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido] = useState([])
    const [ nombre, setNombre] = useState('')
    const [ total, setTotal] = useState(0)


    const router = useRouter();



    const obtenerCategorias = async () => {
        const { data } = await axios("/api/categorias")
        setCategorias(data)
    }


    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
       setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.cantidad * producto.precio) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])


    const handleClickCategoria = (id) => {
       const categoria = categorias.filter( cat => cat.id === id)
       setCategoriaActual(categoria[0])

       router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
            //vemos si el producto que estamos agregando ya existe
        if(pedido.some(productoState => productoState.id === producto.id )) {
            //si existe, Actualizar solo la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Se modifico el pedido')

        } else {
            //si no existe lo agregamos al pedido
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const confirmarPedido = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            }, 1500);


        } catch (error) {
            console.log(error)
        }
    }

    return (

        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                producto,
                handleSetProducto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                confirmarPedido,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext
