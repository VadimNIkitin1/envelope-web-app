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
  const cart = useAppSelector((state) => state.cart.cart_items);
  const render = useAppSelector((state) => state.cart.render);
  const { goToForm } = useAppNavigate();
  const { tg } = useTelegram();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    tg.BackButton.hide();
    if (cart.length !== 0) {
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
  }, [cart]);

  return (
    <div>
      <CategoriesList />
      <ProductList />
    </div>
  );
};

export default HomePage;
