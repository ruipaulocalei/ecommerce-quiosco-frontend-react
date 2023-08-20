import { CategoriaProps } from '../data/Categorias';
import useQuiosco from '../hooks/useQuiosco';

interface Props {
  categoria: CategoriaProps;
}
export default function Categoria({ categoria }: Props) {
  const { handleClickCategoria, categoriaActual } = useQuiosco();
  const { id, name, icon } = categoria;

  const chooseCategory = () =>
    categoriaActual.id === id ? 'bg-amber-400' : 'bg-white';
  
    return (
    <div
      key={id}
      onClick={() => handleClickCategoria(id)}
      className={`${chooseCategory()}
      } flex items-center gap-4 p-3 border
      w-full hover:bg-amber-400 cursor-pointer`}
    >
      <img src={`/img/icono_${icon}.svg`} alt="Imagem Logo" className="w-12" />
      <button
        className="text-lg font-bold 
      cursor-pointer truncate"
        type="button"
      >
        {name}
      </button>
    </div>
  );
}
