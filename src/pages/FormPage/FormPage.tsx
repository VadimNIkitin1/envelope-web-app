import { useEffect } from 'react';

import OrderList from '../../components/OrderList/OrderList';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { getCart, getCartTotalPrice } from '../../store/cartSlice';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.quantity);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartTotalPrice());
  }, [dispatch, quantity]);

  return (
    <div>
      <OrderList />
    </div>
  );
};

export default FormPage;
