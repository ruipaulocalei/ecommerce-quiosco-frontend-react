import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function AdminSidebar() {
    const { logout } = useAuth({ middleware: 'authenticated', url: '/' });
  return (
    <aside className="md:w-72 h-screen">
      <div className="p-4">
        <img src="/img/logo.svg" alt="Logo Image" className="w-40" />
      </div>
      <nav className='flex flex-col gap-y-3'>
        <Link to={'/admin'} className="font-bold text-lg">
          Orders
        </Link>
        <Link to={'/admin/products'} className="font-bold text-lg">
          Products
        </Link>
      </nav>
      <div className='my-5 px-5'>
      <button
          className="text-center bg-red-500
        w-full p-3 font-bold text-white
        truncate shadow-md rounded-sm"
          type="button"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
