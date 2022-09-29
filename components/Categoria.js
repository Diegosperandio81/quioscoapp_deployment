import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({categoria}) => {

    const { nombre, icono, id } = categoria;
    const { categoriaActual, handleClickCategoria } = useQuiosco()

  return (
    <div className={`${categoriaActual?.id === id
            ? 'bg-indigo-500 text-white'
            : ''}
            flex items-center gap-4 w-full border p-5 hover:bg-indigo-500 hover:text-white rounded-lg m-1`}>
        <Image
            width={70}
            height={70}
            alt="Imagen Icono"
            src={`/assets/img/icono_${icono}.svg`}

        />

        <button
            tipe="button"
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria