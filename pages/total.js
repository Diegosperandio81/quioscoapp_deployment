import { useEffect, useCallback } from "react"
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers";



export default function Total({}) {

    const { pedido, nombre, setNombre, confirmarPedido, total } = useQuiosco();

    const comprobarPedido = () => {
        return pedido.length === 0 || nombre.length <= 1;
    }

    useEffect(() => {
        comprobarPedido()
    }, [pedido, nombre, comprobarPedido])

    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10 text-center">Confirma el Pedido</p>

            <form
                onSubmit={confirmarPedido}
            >
                <div>

                <label
                    htmlFor='nombre'
                    className="block uppercase text-slate-800 font-bold text-xl"
                >Nombre cliente</label>
                <input
                    id="nombre"
                    type="text"
                    className="bg-gray-200 rounded w-full lg:w-1/3 mt-3 p-2"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div>
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-800'} w-full lg:w-auto
                                   py-2 px-5 mt-5 rounded uppercase text-center text-lg font-bold
                                   text-white hover:cursor-pointer`}
                        value="Confirmar pedido"
                        disabled={comprobarPedido()}
                    />
                </div>

            </form>
        </Layout>
    )
}