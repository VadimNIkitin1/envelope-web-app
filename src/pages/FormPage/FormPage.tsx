import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { getCart, getCartTotalPrice } from '../../store/cartSlice';
import { useCart } from '../../hooks/useCart';

import style from './FormPage.module.scss';
import TrashButton from '../../ui/TrashButton/TrashButton';
import CartItem from '../../components/CartItem/CartItem';
import OrderForm from '../../components/OrderForm/OrderForm';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.total_price);
  const render = useAppSelector((state) => state.cart.render);
  const cart = useAppSelector((state) => state.cart.cart_items);
  const { onClear } = useCart();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartTotalPrice());
  }, [render]);

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
          cart.map((prod) => <CartItem cart_items={prod} key={prod.id} total_price={totalPrice} />)
        )}
      </div>
      <h3>Заказ на сумму {totalPrice} руб</h3>
      <h4 className={style.deliveryText}>
        Доставка {totalPrice < 800 ? '249р 🚚' : 'бесплатно 😊'}
      </h4>
      <OrderForm />
    </div>
  );
};

export default FormPage;
