import { ReactNode, createContext, useState } from 'react';
import { CategoriaProps, categorias as categoriaDB } from '../data/Categorias';

interface QuioscoContextProps {
  categorias: CategoriaProps[];
  categoriaActual: CategoriaProps;
  handleClickCategoria: (id: number) => void;
}
const QuioscoContext = createContext<QuioscoContextProps>(
  {} as QuioscoContextProps
);

type QuioscoContextProviderProps = {
  children: ReactNode;
};

const QuioscoProvider = ({ children }: QuioscoContextProviderProps) => {
  const [categorias, setCategorias] = useState(categoriaDB);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);

  const handleClickCategoria = (id: number) => {
    const categoria = categorias.find((categoria) => categoria.id === id);
    if (categoria) {
      setCategoriaActual(categoria);
    }
  };
  return (
    <QuioscoContext.Provider
      value={{ categorias, categoriaActual, handleClickCategoria }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
