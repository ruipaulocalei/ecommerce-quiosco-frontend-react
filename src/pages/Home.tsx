import Produto from '../components/Produto';
import useQuiosco from '../hooks/useQuiosco';
import useSWR from 'swr';
import apiClient from '../services/api-client';
import { ProdutoProps } from '../data/produtos';

export interface ProductResponse {
  data: ProdutoProps[];
}

export default function Home() {
  const { categoriaActual } = useQuiosco();
  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcher = () =>
    apiClient.get<ProductResponse>('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((data) => {
      return data.data;
    });
  const { data, isLoading } = useSWR<ProductResponse>(
    '/api/products',
    fetcher, {
      refreshInterval: 5000,
    }
  );
  if (isLoading) return 'Loading';
  const products =
    data?.data &&
    data.data.filter((product) => product.categoria_id === categoriaActual.id);
  return (
    <>
      <h1
        className="
    text-4xl from-black"
      >
        {categoriaActual.name}
      </h1>
      <p>Elege e personaliza o teu pedido</p>
      <div
        className="grid gap-4 grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {products &&
          products.map((produto) => (
            <Produto key={produto.id} produto={produto} addButton={true} />
          ))}
      </div>
    </>
  );
}
