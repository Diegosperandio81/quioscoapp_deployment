import { useRouter } from "next/router";


const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
];

const Pasos = () => {

    const router = useRouter();


    const calcularProgreso = () => {

        let porcentaje

        if( router.pathname === '/') {
            porcentaje = 25
        } else if ( router.pathname === '/resumen') {
            porcentaje = 50
        } else {
            porcentaje = 100
        }
        return porcentaje
    }

  return (
    <>
        <div className="flex justify-between mb-10 ml-20 mr-20">
            {pasos.map( paso => (
                <button
                    onClick={() => {
                        router.push(paso.url)
                    }}

                    className="text-xl font-bold"
                    key={paso.paso}>
                    {paso.nombre}
                </button>
            ))}
        </div>

        <div className="bg-gray-100 mb-10">
            <div className="rounded-full bg-indigo-500 text-xs leading-none h-2 text-center text-white" style={{width: `${calcularProgreso()}%`}}>

            </div>
        </div>
    </>
  )
}

export default Pasos