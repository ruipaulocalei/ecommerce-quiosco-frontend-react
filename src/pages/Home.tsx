import Produto from '../components/Produto';
import { productos as data } from '../data/produtos';
import useQuiosco from '../hooks/useQuiosco';

export default function Home() {
  const { categoriaActual } = useQuiosco();

  const products = data.filter(
    (product) => product.category_id === categoriaActual.id
  );
  return (
    <>
      <h1
        className="
    text-4xl from-black"
      >
        {categoriaActual.name}
      </h1>
      <p>Elege e personalizao teu pedido</p>
      <div
        className="grid gap-4 grid-cols-1
    md:grid-cols-2 xl:grid-cols-3"
      >
        {products.map((produto) => (
          <Produto key={produto.image} produto={produto} />
        ))}
      </div>
    </>
  );
}
