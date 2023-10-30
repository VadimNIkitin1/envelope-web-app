import { FC } from 'react';
import { ICartItem } from '../../store/types';
import Counter from '../../ui/Counter/Counter';

import { textCut } from '../../utils/textCut';

import style from './CartItem.module.scss';

const CartItem: FC<ICartItem> = ({ product, quantity, total_price }) => {
  const { name_rus, price, id } = product;

  return (
    <div className={style.item}>
      <img src={'webp_image_url'} alt="webp_image_url" className={style.image} />
      <p className={style.name}>
        {textCut(name_rus, 30)}
        <br />
        {price} руб
        <br />
        Итог {total_price}
      </p>
      <div style={{ width: '100px', height: '40px' }}>
        <Counter id={String(id)}>{quantity}</Counter>
      </div>
    </div>
  );
};

export default CartItem;
