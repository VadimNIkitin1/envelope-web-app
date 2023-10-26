import { useAppNavigate } from './useAppNavigate';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useCart = (id: number) => {
  // const dispatch = useAppDispatch();
  // const cart = useAppSelector(state => state.cart.cart);
  // const { goBack } = useAppNavigate();

  const cartArr: number[] = [];
  const cartQuantity: number[] = [];

  // cart.map((el: any) => cartArr.push(el.product.id) && cartQuantity.push(el.quantity));

  // const targetProd = cart.filter((prod: any) => prod.product.id === Number(id));

  // const onClear = async () => {
  //   await dispatch(onClearCart());
  //   goBack();
  // };

  return {
    // cartArr,
    // cartQuantity,
    // targetProd,
    // onClear,
  };
};
