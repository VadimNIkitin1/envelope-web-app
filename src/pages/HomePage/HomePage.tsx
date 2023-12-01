import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { getCart } from '../../store/cartSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { goToForm, goBack } = useAppNavigate();
  const { tg } = useTelegram();

  const { cart_items, render } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    tg.BackButton.show().onClick(goBack);
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
      tg.BackButton.show().offClick(goBack);
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
