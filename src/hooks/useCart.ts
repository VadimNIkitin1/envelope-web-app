import { useAppNavigate } from './useAppNavigate';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { clearCart } from '../store/cartSlice';

export const useCart = (id?: string) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart_items);

  const { goBack } = useAppNavigate();

  const cartArr: number[] = [];
  const cartQuantity: number[] = [];

  cart.map((el: any) => cartArr.push(el.id) && cartQuantity.push(el.quantity));

  const targetProd = cart.filter((prod: any) => prod.id === Number(id))?.[0];

  const onClear = async () => {
    await dispatch(clearCart());
    goBack();
  };

  return {
    cartArr,
    cartQuantity,
    targetProd,
    onClear,
  };
};
