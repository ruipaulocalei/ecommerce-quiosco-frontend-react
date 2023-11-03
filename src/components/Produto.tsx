import React from 'react';
import { ProdutoProps } from '../data/produtos';
import { formatCurrency } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

interface Props {
  produto: ProdutoProps;
  addButton?: boolean;
  availableButton?: boolean;
}
export default function Produto({
  produto,
  addButton,
  availableButton,
}: Props) {
  const { handleClickModal, handleSetProduct, handleClickProductNotAvailable } =
    useQuiosco();
  const { id, name, price, image } = produto;
  return (
    <div className="border p-3 shadow bg-white">
      <img
        src={`/img/${image}.jpg`}
        alt={`Imagem ${name}`}
        className="w-full"
      />

      <div className="p-3">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-3 font-black text-4xl text-amber-500">
          {formatCurrency(price)}
        </p>
        {addButton && (
          <button
            type="button"
            className="uppercase text-white 
          bg-indigo-600 hover:bg-indigo-800
        w-full mt-5 p-3 font-bold"
            onClick={() => {
              handleClickModal(), handleSetProduct(produto);
            }}
          >
            adicionar
          </button>
        )}

        {availableButton && (
          <button
            type="button"
            className="uppercase text-white 
          bg-indigo-600 hover:bg-indigo-800
        w-full mt-5 p-3 font-bold"
            onClick={() => {
              handleClickProductNotAvailable(id);
            }}
          >
            Unavailable product
          </button>
        )}
      </div>
    </div>
  );
}
