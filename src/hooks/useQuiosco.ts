import { useContext } from 'react';
import QuioscoContext from '../context/QuioscoProvider';

const useQuiosco = () => {
  const context = useContext(QuioscoContext);
//   if (context) {
//     throw new Error('useQuiosco must be used within a QuioscoProvider');
//   }
  return context;
};

export default useQuiosco;
