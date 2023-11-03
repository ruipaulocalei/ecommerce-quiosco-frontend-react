import { ReactNode, createContext, useEffect, useState } from 'react';
import { ProdutoProps } from '../data/produtos';
import apiClient from '../services/api-client';
import { CategoriaProps } from '../data/Categorias';

interface CategoriaPropsResponse {
  data: CategoriaProps[];
}

interface QuioscoContextProps {
  categorias: CategoriaProps[];
  categoriaActual: CategoriaProps;
  product: ProdutoProps;
  total: number;
  modalIsOpen: boolean;
  cart: CartItem[];
  handleClickCategoria: (id: number) => void;
  handleSetProduct: (product: ProdutoProps) => void;
  handleClickModal: () => void;
  handleEditQuantity: (id: number) => void;
  handleDeleteProductInCart: (id: number) => void;
  handleAddToCart: (product: CartItem) => void;
  handleSubmitNewOrder: () => void;
  handleClickCompleteOrder: (id: number) => void;
  handleClickProductNotAvailable: (id: number) => void;
}

export type CartItem = {
  product: ProdutoProps;
  quantity: number;
};

const QuioscoContext = createContext<QuioscoContextProps>(
  {} as QuioscoContextProps
);

type QuioscoContextProviderProps = {
  children: ReactNode;
};

const QuioscoProvider = ({ children }: QuioscoContextProviderProps) => {
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [categoriaActual, setCategoriaActual] = useState<CategoriaProps>(
    {} as CategoriaProps
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState<ProdutoProps>({} as ProdutoProps);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce(
      (total, product) => product.product.price * product.quantity + total,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    // Make the API call when the component mounts
    apiClient
      .get<CategoriaPropsResponse>(`/api/categorias`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
        }
      })
      .then((response) => {
        setCategorias(response.data.data);
        setCategoriaActual(response.data.data[0]);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickCategoria = (id: number) => {
    const categoria = categorias.find((categoria) => categoria.id === id);
    if (categoria) {
      setCategoriaActual(categoria);
    }
  };

  const handleClickModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSetProduct = (product: ProdutoProps) => {
    setProduct(product);
  };

  const handleAddToCart = (product: CartItem) => {
    const newItem: CartItem = {
      product: product.product,
      quantity: product.quantity,
    };
    setCart([...cart, newItem]);
    if (
      product &&
      cart.some((cartState) => cartState.product?.id === newItem.product.id)
    ) {
      const cartUpdated = cart.map((cartState) =>
        cartState.product.id === newItem.product.id ? newItem : cartState
      );
      setCart(cartUpdated);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const handleEditQuantity = (id: number) => {
    const productUpdated = cart.filter(
      (product) => product.product.id === id
    )[0];
    setProduct(productUpdated.product);
    setModalIsOpen(!modalIsOpen);
  };

  const handleDeleteProductInCart = (id: number) => {
    const cartUpdated = cart.filter((product) => product.product.id !== id);
    setCart(cartUpdated);
  };

  const handleSubmitNewOrder = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      await apiClient.post(
        '/api/orders',
        {
          total,
          products: cart.map((item) => {
            return {
              id: item.product.id,
              quantity: item.quantity,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        setCart([]);
      }, 1000);
    } catch (error) {}
  };

  const handleClickCompleteOrder = async (id: number) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      await apiClient.put(`/api/orders/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  const handleClickProductNotAvailable = async (id: number) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      await apiClient.put(`/api/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        modalIsOpen,
        total,
        product,
        cart,
        handleSetProduct,
        handleClickCategoria,
        handleClickModal,
        handleAddToCart,
        handleEditQuantity,
        handleDeleteProductInCart,
        handleSubmitNewOrder,
        handleClickCompleteOrder,
        handleClickProductNotAvailable
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
