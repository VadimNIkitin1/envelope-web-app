import { useAppSelector } from '../../hooks/useAppSelector';
import { useCart } from '../../hooks/useCart';

import OrderForm from '../OrderForm/OrderForm';
import CartItem from '../CartItem/CartItem';

import TrashButton from '../../ui/TrashButton/TrashButton';

import style from './OrderList.module.css';

const OrderList = () => {
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const cart = useAppSelector((state) => state.cart.cart);
  const { onClear } = useCart();

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
            <CartItem
              product={prod}
              key={prod.product.id}
              quantity={prod.quantity}
              prodTotalPrice={prod.total_price}
            />
          ))
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

export default OrderList;
