import useSWR from 'swr';
import apiClient from '../services/api-client';
import Produto from '../components/Produto';
import { ProductResponse } from './Home';
import { useState } from 'react';
export default function Products() {
  const [pageIndex, setPageIndex] = useState(2);
  const token = localStorage.getItem('AUTH_TOKEN');

  const fetcher = () =>
    apiClient<ProductResponse>('/api/products', {
      params: {
        page: pageIndex,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const { data, isLoading } = useSWR(`/api/products/${pageIndex}`, fetcher, {
    refreshInterval: 10000,
  });
  const lastPage = data?.data.meta.last_page;

  if (isLoading) return 'Loading';

  return (
    <div>
      <h1
        className="
text-4xl from-black"
      >
        Products
      </h1>
      <p>Manage availability here</p>
      <div
        className="grid gap-4 grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {data?.data.data.map((produto) => (
          <Produto key={produto.id} produto={produto} availableButton={true} />
        ))}
      </div>
      <div className="flex gap-4 mt-4 w-full justify-center">
        {pageIndex !== 1 && (<button
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          &larr;
        </button>)}
        <p>
          Page {pageIndex} of {lastPage} Total of records:{' '}
          {data?.data.meta.total}
        </p>
        {pageIndex !== lastPage && (
          <button
            disabled={pageIndex === lastPage}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
