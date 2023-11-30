import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { addTgUser, getCart } from '../../store/cartSlice';
import { getProducts } from '../../store/productsSlice';
import { getCategories } from '../../store/categoriesSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { goToForm } = useAppNavigate();
  const { tg, id, first_name, last_name, username, is_premium } = useTelegram();

  const { cart_items, render } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(
      addTgUser({
        tg_user_id: !id ? 1132630506 : id,
        first_name: !first_name ? '-' : first_name,
        last_name: !last_name ? '-' : last_name,
        username: !username ? '-' : username,
        is_premium: !is_premium ? false : is_premium,
      })
    );
    dispatch(getCategories());
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
    <>
      <CategoriesList />
      <ProductList />
    </>
  );
};

export default HomePage;
