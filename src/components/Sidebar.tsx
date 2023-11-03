import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const { categorias } = useQuiosco();
  const { logout, user } = useAuth({ middleware: 'authenticated', url: '/' });
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" className="w-40" alt="Logo" />
      </div>
      <h6 className='mt-10'>{user?.name}</h6>
      <div className="mt-5">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>
      <div className="my-5 px-5">
        <button
          className="text-center bg-red-500
        w-full p-3 font-bold text-white
        truncate shadow-md rounded-sm"
          type="button"
          onClick={logout}
        >
          Cancelar Pedido
        </button>
      </div>
    </aside>
  );
}
