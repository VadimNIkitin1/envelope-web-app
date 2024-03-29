import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { clearCart, getCart } from '../../store/cartSlice';

import style from './FormPage.module.scss';

import CartItem from '../../components/CartItem/CartItem';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useTelegram } from '../../hooks/useTelegram';

import { useAppNavigate } from '../../hooks/useAppNavigate';
import { Button } from '../../ui/Button/Button';
import { ORDER_TYPE } from '../../components/OrderTypes/OrderTypes.data';
import { GiForkKnifeSpoon } from 'react-icons/gi';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const { tg } = useTelegram();
  const { goBack } = useAppNavigate();
  const { render, cart_items, total_price } = useAppSelector((state) => state.cart);
  const order_type = useAppSelector((state) => state.activeTab.order_type);
  const [quantityTools, setQuantityTools] = useState(cart_items.length);

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
        {order_type === ORDER_TYPE.DINEIN && (
          <h1>
            Ваш заказ <p style={{ fontSize: '16px' }}>(В зале) </p>
          </h1>
        )}
        {order_type === ORDER_TYPE.TAKEAWAY && (
          <h1>
            Ваш заказ <p style={{ fontSize: '16px' }}>(Самовывоз)</p>
          </h1>
        )}
        {order_type === ORDER_TYPE.DELIVERY && (
          <h1>
            Ваш заказ <p style={{ fontSize: '16px' }}>(Доставка)</p>
          </h1>
        )}
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
      {order_type === ORDER_TYPE.DELIVERY && (
        <div className={style.tools}>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <GiForkKnifeSpoon fontSize={'35px'} />
            <p>Приборы</p>
          </div>
          {quantityTools > 0 ? (
            <div className={style.counter}>
              <button
                className={style.minus}
                children={'➖'}
                onClick={() => setQuantityTools(quantityTools - 1)}
              />
              <p className={style.quantity}>{quantityTools}</p>
              <button
                className={style.plus}
                children={'➕'}
                onClick={() => setQuantityTools(quantityTools + 1)}
              />
            </div>
          ) : (
            <Button
              view="add"
              children="Добавить"
              onClick={() => setQuantityTools(quantityTools + 1)}
            />
          )}
        </div>
      )}
      <h3>Заказ на сумму {total_price} руб</h3>
      {order_type === ORDER_TYPE.DELIVERY && (
        <h4 className={style.deliveryText}>
          Доставка {total_price < 800 ? '249р 🚚' : 'бесплатно 😊'}
        </h4>
      )}
      <OrderForm cart={cart_items} />
      {order_type === ORDER_TYPE.TAKEAWAY && (
        <>
          <p>Адрес для самовывоза г. Томск, ул. Вадима Саратова 69</p>
          <p>Телефон заведения: +7969-069-69-69</p>
        </>
      )}
    </div>
  );
};

export default FormPage;
