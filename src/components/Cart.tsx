import { CartItem } from '../context/QuioscoProvider';
import { ProdutoProps } from '../data/produtos';
import { formatCurrency } from '../helpers';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import useQuiosco from '../hooks/useQuiosco';

export default function Cart({ product, quantity }: CartItem) {
  const { id, name, price } = product;
  const { handleEditQuantity, handleDeleteProductInCart } = useQuiosco();
  return (
    <div className="shadow space-y-1 p-4 bg-white">
      <div className="space-y-2">
        <p className="text-xl font-bold">{name}</p>
        <p className="text-lg font-bold ">Quantity: {quantity}</p>
        <p className="text-lg font-bold text-amber-500">
          Price: {formatCurrency(price)}
        </p>
        <p className="text-lg text-gray-700">
          Subtotal: {formatCurrency(price * quantity)}
        </p>
      </div>

      <div className="flex justify-between gap-2 pb-4">
        <button
          onClick={() => handleEditQuantity(id)}
          type="button"
          className="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
        >
          <AiFillEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDeleteProductInCart(id)}
          type="button"
          className="bg-red-700 p-2 text-white 
          rounded-md font-bold uppercase 
          shadow-md text-center ml-auto"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
}
