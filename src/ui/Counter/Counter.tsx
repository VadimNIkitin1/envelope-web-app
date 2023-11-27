import { FC, ReactNode } from 'react';
import { addProduct, decreaseProduct } from '../../store/cartSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import style from './Counter.module.scss';
import { Button } from '../Button/Button';

interface ICounter {
  children: ReactNode;
  id: string | undefined;
}

const Counter: FC<ICounter> = ({ children, id }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.Counter}>
      <Button children={'➖'} view="minus" onClick={() => dispatch(decreaseProduct(id))} />
      <p className={style.quantity}>{children}</p>
      <Button children={'➕'} view="plus" onClick={() => dispatch(addProduct(id))} />
    </div>
  );
};

export default Counter;
