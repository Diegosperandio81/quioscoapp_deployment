import { useEffect, useState } from "react"
import useQuiosco from "../hooks/useQuiosco"
import Image from "next/image"
import { formatearDinero } from "../helpers"

const ModalProducto = () => {

    const { handleChangeModal, producto, handleAgregarPedido, pedido } = useQuiosco()
    const [cantidad, setCantidad ] = useState(1)
    const [ cantidadInicial, setCantidadInicial ] = useState(false)

    useEffect(() => {
        if( pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id);
            setCantidadInicial(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image
                width={300}
                height={400}
                alt={`Imagen de ${producto.nombre}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />

        </div>

        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleChangeModal}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365
                      9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0
                      101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12
                      10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
                </button>

            </div>
            <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>
            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={() => {
                        if (cantidad <= 1) return
                        setCantidad(cantidad - 1)
                    }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365
                        9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
                </svg>
                </button>

                <p className="text-3xl">{cantidad}</p>

                <button
                    type="button"
                    onClick={() => {
                        if (cantidad >= 15) return
                        setCantidad(cantidad + 1)
                    }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365
                        9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75
                        0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
                </button>
            </div>

            <button
                type="button"
                className="uppercase rounded bg-indigo-600 hover:bg-indigo-900 text-white font-bold px-5 mt-8 py-4"
                onClick={() => handleAgregarPedido({...producto, cantidad})}
            >
                {cantidadInicial ? 'Guardar cambios' : 'Añadir al pedido' }
            </button>


        </div>
    </div>
  )
}

export default ModalProducto