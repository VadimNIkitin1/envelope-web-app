import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { getCart } from '../../store/cartSlice';
import { getProducts } from '../../store/productsSlice';
import { getCategories } from '../../store/categoriesSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { goToForm } = useAppNavigate();
  const { tg } = useTelegram();

  const { cart_items, render } = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products.products);
  const categories = useAppSelector((state) => state.categories.categories);
  const activeTab = useAppSelector((state) => state.activeTab.active);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    tg.BackButton.hide();
    if (cart_items.length !== 0) {
      tg.MainButton.setParams({
        text: 'Перейти в корзину',
      })
        .show()
        .onClick(goToForm);
    } else {
      tg.MainButton.hide();
    }
    return () => {
      tg.MainButton.offClick(goToForm);
    };
  }, [cart_items]);

  return (
    <div>
      <CategoriesList categories={categories} activeTab={activeTab} />
      <ProductList cart={cart_items} products={products} categories={categories} />
    </div>
  );
};

export default HomePage;
