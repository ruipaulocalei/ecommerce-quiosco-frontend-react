import { formatCurrency } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';
import Cart from './Cart';
import {FormEvent} from 'react'

export default function Resume() {
  const { cart, total, handleSubmitNewOrder } = useQuiosco();

  const cartIsEmpty = () => cart.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmitNewOrder()
  }
  return (
    <div className="w-72 h-screen overflow-y-scroll p5">
      <h1 className="text-4xl font-black">Meu Carrinho</h1>
      <p className="my-5 text-lg">
        Aqui podes ver produtos no carrinho e o total
      </p>
      <div className="py-10">
        {cart.length === 0 ? (
          <p className="text-center text-2xl">Cart is empty</p>
        ) : (
          cart.map((product) => (
            <Cart
              key={product.product.id}
              product={product.product}
              quantity={product.quantity}
            />
          ))
        )}
      </div>
      <p className="text-xl mt-10">Total: {formatCurrency(total)}</p>
      <form className="w-full"
      onSubmit={handleSubmit}>
        <div className="mt-5">
          <input
            type="submit"
            className={`px-5 py-2 rounded uppercase font-bold 
            text-white text-center w-full ${cartIsEmpty() ? 'bg-indigo-100 pointer-events-none' :'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'}`}
            value={'Confirmar Pedido'}
            disabled={cartIsEmpty()}
          />
        </div>
      </form>
    </div>
  );
}
