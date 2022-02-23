import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);
const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storageProducts = await AsyncStorage.getItem(
        '@GoMarketPlace:product',
      );

      if (storageProducts) {
        setProducts([...JSON.parse(storageProducts)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const isExistsProduct = products.find(p => p.id === product.id);

      if (isExistsProduct) {
        const productsMap = products.map(p =>
          p.id === product.id ? { ...product, quantity: p.quantity + 1 } : p,
        );
        setProducts(productsMap);
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      await AsyncStorage.setItem(
        '@GoMarketPlace:product',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const productsMap = products.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p,
      );
      setProducts(productsMap);
      await AsyncStorage.setItem(
        '@GoMarketPlace:product',
        JSON.stringify(productsMap),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      // const product = products.find(p => p.id === id);
      const productsMap = products.map(p =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
      );
      setProducts(productsMap);

      await AsyncStorage.setItem(
        '@GoMarketPlace:product',
        JSON.stringify(productsMap),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
