import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { clearCart, getCart } from '../../store/cartSlice';

import style from './FormPage.module.scss';

import CartItem from '../../components/CartItem/CartItem';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useTelegram } from '../../hooks/useTelegram';

import { useAppNavigate } from '../../hooks/useAppNavigate';
import { Button } from '../../ui/Button/Button';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const { tg } = useTelegram();
  const { goBack } = useAppNavigate();
  const { render, cart_items, total_price } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  const onClear = async () => {
    await dispatch(clearCart());
    goBack();
  };

  useEffect(() => {
    tg.BackButton.show().onClick(goBack);
    return () => {
      tg.BackButton.offClick(goBack);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.orderTitle}>
        <h1>Ваш заказ</h1>
        <Button onClick={() => onClear()} view="trash" />
      </div>
      <div>
        {!cart_items.length ? (
          <h2>Список пуст...</h2>
        ) : (
          cart_items.map((prod) => (
            <CartItem cart_items={prod} key={prod.id} total_price={prod.unit_price} />
          ))
        )}
      </div>
      <h3>Заказ на сумму {total_price} руб</h3>
      <h4 className={style.deliveryText}>
        Доставка {total_price < 800 ? '249р 🚚' : 'бесплатно 😊'}
      </h4>
      <OrderForm cart={cart_items} />
    </div>
  );
};

export default FormPage;
