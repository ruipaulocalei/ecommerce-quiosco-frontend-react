export interface CategoriaProps {
  icon: string;
  name: string;
  id: number;
}
const categorias = <CategoriaProps[]>[
  {
    icon: 'cafe',
    name: 'Café',
    id: 1,
  },
  {
    icon: 'hamburguesa',
    name: 'Hamburguer',
    id: 2,
  },
  {
    icon: 'pizza',
    name: 'Pizza',
    id: 3,
  },
  {
    icon: 'dona',
    name: 'Dona',
    id: 4,
  },
  {
    icon: 'pastel',
    name: 'Pastel',
    id: 5,
  },
  {
    icon: 'galletas',
    name: 'Galletas',
    id: 6,
  },
];

export { categorias };
