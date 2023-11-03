import { ProdutoProps } from '../data/produtos';
import { formatCurrency } from '../helpers';
import { UserProps } from '../hooks/useAuth';
import useQuiosco from '../hooks/useQuiosco';
import apiClient from '../services/api-client';
import useSWR from 'swr';
type OrderProps = {
  data: {
    id: number;
    total: number;
    status: boolean;
    products: ProdutoProps[];
    user: UserProps;
  }[];
};
export default function Orders() {
  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcher = () =>
    apiClient<OrderProps>('/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, isLoading } = useSWR('/api/orders', fetcher, {
    refreshInterval: 1000,
  });

  const {handleClickCompleteOrder} = useQuiosco()

  if (isLoading) return 'Loading';
  return (
    <div>
      <h1
        className="
text-4xl from-black"
      >
        Orders
      </h1>
      <p>Admin your orders here</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.data.data.map((order) => (
          <div
            key={order.id}
            className="p-5 bg-white shadow space-y-2 border-b"
          >
            <p className="text-xl font-bold text-slate-600">
              Order n# {order.id}
            </p>
            {order.products.map((product) => (
              <div
                key={product.id}
                className="border-b border-b-slate-200
            last-of-type:border-none py-4"
              >
                <p className="text-sm">ID: {product.id}</p>
                <p>{product.name}</p>
                <p>Quantity: {product.pivot?.quantity}</p>
              </div>
            ))}
            <p className="text-lg font-bold text-slate-600">
              Cliente: <span className="font-normal">{order.user.name}</span>
            </p>
            <p className="text-lg font-bold text-amber-600">
              Total a pagar:{' '}
              <span className="font-normal text-slate-600">
                {formatCurrency(order.total)}
              </span>
            </p>
            <button
            onClick={() => handleClickCompleteOrder(order.id)}
              type="button"
              className={`px-5 py-2 rounded uppercase font-bold 
            text-white text-center w-full bg-indigo-600 hover:bg-indigo-800 cursor-pointer`}
            >
              Completar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
