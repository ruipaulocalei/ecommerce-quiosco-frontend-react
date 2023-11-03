import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  useAuth({ middleware: 'admin', url: '/' });
  return (
    <div className="md:flex">
      <AdminSidebar />
      <main
        className="flex-1
      p-3 h-screen overflow-y-scroll bg-gray-100"
      >
        <Outlet />
      </main>
    </div>
  );
}
