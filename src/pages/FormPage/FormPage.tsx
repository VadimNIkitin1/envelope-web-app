import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { clearCart, getCart } from '../../store/cartSlice';

import style from './FormPage.module.scss';
import TrashButton from '../../ui/TrashButton/TrashButton';
import CartItem from '../../components/CartItem/CartItem';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useTelegram } from '../../hooks/useTelegram';

import { useAppNavigate } from '../../hooks/useAppNavigate';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const render = useAppSelector((state) => state.cart.render);
  const cart = useAppSelector((state) => state.cart.cart_items);
  const total_price = useAppSelector((state) => state.cart.total_price);
  const { goBack } = useAppNavigate();
  const { tg } = useTelegram();
  console.log(total_price);

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
        <TrashButton onClick={() => onClear()} />
      </div>
      <div>
        {!cart.length ? (
          <h2>Список пуст...</h2>
        ) : (
          cart.map((prod) => (
            <CartItem cart_items={prod} key={prod.id} total_price={prod.unit_price} />
          ))
        )}
      </div>
      <h3>Заказ на сумму {total_price} руб</h3>
      <h4 className={style.deliveryText}>
        Доставка {total_price < 800 ? '249р 🚚' : 'бесплатно 😊'}
      </h4>
      <OrderForm cart={cart} />
    </div>
  );
};

export default FormPage;
