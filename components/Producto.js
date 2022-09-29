import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto}) => {

    const { handleSetProducto, handleChangeModal, modal } = useQuiosco()

    const { nombre, imagen, precio } = producto


  return (

        <div className="border p-3">
            <Image
                className='rounded-lg'
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen menu ${nombre}`}
                width={400}
                height={500}
            />


            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>
                <button
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-900  rounded mt-3 uppercase text-white font-bold w-full p-2"
                    onClick={() => {
                        handleSetProducto(producto)
                        handleChangeModal()
                        }}
                >Agregar al pedido</button>

            </div>
        </div>

  )
}

export default Producto