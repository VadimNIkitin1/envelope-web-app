import { useEffect } from 'react';

import OrderList from '../../components/OrderList/OrderList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import { getCart, getCartTotalPrice } from '../../store/cartSlice';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.quantity);
  const { goBack } = useAppNavigate();
  const { onToggleBackButton } = useTelegram();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartTotalPrice());
  }, [quantity]);

  onToggleBackButton(goBack);

  return (
    <div>
      <OrderList />
    </div>
  );
};

export default FormPage;
