import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { clearCart, getCart } from '../../store/cartSlice';
import { Button } from '../../ui/Button/Button';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { goToForm, goToStartPage } = useAppNavigate();
  const { tg, id } = useTelegram();
  const { cart_items, render } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  const handleBackButton = () => {
    goToStartPage();
    dispatch(clearCart());
  };

  useEffect(() => {
    tg.BackButton.show().onClick(handleBackButton);
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
      tg.BackButton.offClick(handleBackButton);
    };
  }, [cart_items]);

  return (
    <>
      <CategoriesList />
      {!id && (
        <Button onClick={goToForm} children="К заказу" view="add" styles={{ marginTop: '70px' }} />
      )}
      {!id && (
        <Button
          onClick={handleBackButton}
          children="Назад"
          view="add"
          styles={{ marginTop: '70px' }}
        />
      )}
      <ProductList />
    </>
  );
};

export default HomePage;
