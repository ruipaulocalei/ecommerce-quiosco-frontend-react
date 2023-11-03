import { useEffect, useState } from 'react';
import { formatCurrency } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

export default function ModalProduct() {
  const { product, handleClickModal, handleAddToCart, cart } = useQuiosco();
  const [quantity, setQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // console.log(cart)
    // console.log('Product ID:', product.id);
    // console.log(
    //   'Cart Product IDs:',
    //   cart.map((cartState) => cartState.product && cartState.product.id)
    // );

    if (
      product &&
      cart.some((cartState) => cartState.product?.id === product.id)
    ) {
      const productEdit = cart.filter(
        (cartState) => cartState.product.id === product.id
      )[0];
      setQuantity(productEdit.quantity)
      setIsEditing(true)
    }
  }, [cart, product]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <img src={`/img/${product.image}.jpg`} alt={`${product?.name}`} />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleClickModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{product.name}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => {
              if (quantity <= 1) return;
              setQuantity(quantity - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{quantity}</p>
          <button onClick={() => setQuantity(quantity + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => {
            handleAddToCart({ quantity, product: { ...product } });
            handleClickModal();
          }}
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 
          px-5 py-2 mt-5 text-white uppercase rounded"
        >
          {isEditing ? 'Editing': 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
