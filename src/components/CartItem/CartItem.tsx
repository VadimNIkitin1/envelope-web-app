import Counter from '../../ui/Counter/Counter';

import { textCut } from '../../utils/textCut';
import default_image from '../../public/default_img.png';

import style from './CartItem.module.scss';
import { useInView } from 'react-intersection-observer';

const CartItem = ({ cart_items, total_price }) => {
  const { name, price, id, quantity, image } = cart_items;

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <>
      {quantity !== 0 ? (
        <div className={style.item} ref={ref}>
          {!inView ? (
            <div className={style.image}></div>
          ) : (
            <img src={!image ? default_image : image} alt="image" className={style.image} />
          )}
          <p className={style.name}>
            {textCut(name, 30)}
            <br />
            {price} руб
            <br />
            Итог {total_price}
          </p>
          <div style={{ width: '100px', height: '40px' }}>
            <Counter id={String(id)}>{quantity}</Counter>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CartItem;
