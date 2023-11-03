import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Resume from '../components/Resume';
import useQuiosco from '../hooks/useQuiosco';
import Modal from 'react-modal';
import ModalProduct from '../components/ModalProduct';
import { useAuth } from '../hooks/useAuth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function Layout() {
  const {user} = useAuth({ middleware: 'authenticated', url: '/' });
  const { modalIsOpen } = useQuiosco();
  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main
          className="flex-1
      p-3 h-screen overflow-y-scroll bg-gray-100"
        >
          <Outlet />
        </main>
        {/* <Resume /> */}
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <ModalProduct />
      </Modal>
    </>
  );
}
