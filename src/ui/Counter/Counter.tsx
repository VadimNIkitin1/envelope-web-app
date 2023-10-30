import { FC, ReactNode } from 'react';
import { addProduct, deleteProduct } from '../../store/cartSlice';

import CounterButton from '../CounterButton/CounterButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import style from './Counter.module.scss';

interface ICounter {
  children: ReactNode;
  id: string | undefined;
}

const Counter: FC<ICounter> = ({ children, id }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.Counter}>
      <CounterButton
        children={'➖'}
        className={style.minus}
        onClick={() => dispatch(deleteProduct(id))}
      />
      <p className={style.quantity}>{children}</p>
      <CounterButton
        children={'➕'}
        className={style.plus}
        onClick={() => dispatch(addProduct(id))}
      />
    </div>
  );
};

export default Counter;
