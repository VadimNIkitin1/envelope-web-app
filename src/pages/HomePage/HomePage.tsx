import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { clearCart, getCart } from '../../store/cartSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { goToForm, goToStartPage } = useAppNavigate();
  const { tg } = useTelegram();
  const { cart_items, render } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    const handleBackButton = dispatch(clearCart());
    tg.BackButton.onClick(handleBackButton);
    return () => {
      tg.BackButton.offClick(handleBackButton);
    };
  }, []);

  useEffect(() => {
    tg.BackButton.show().onClick(goToStartPage);
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
      tg.BackButton.show().offClick(goToStartPage);
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
