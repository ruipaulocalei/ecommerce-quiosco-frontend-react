import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Resume from '../components/Resume';
export default function Layout() {
  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1
      p-3 h-screen overflow-y-scroll bg-gray-100">
        <Outlet />
      </main>
      <Resume />
    </div>
  );
}
