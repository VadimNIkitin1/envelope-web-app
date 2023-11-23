import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { textCut } from '../../utils/textCut';
import { addProduct } from '../../store/cartSlice';
import AddButton from '../../ui/AddButton/AddButton';
import Counter from '../../ui/Counter/Counter';
import default_img from '../../public/default_img.png';

import style from './ProductItem.module.scss';
import { schema, store_id } from '../../store/productsSlice';
import { useInView } from 'react-intersection-observer';

const ProductItem = ({ prod, ifCart }: any) => {
  const dispatch = useAppDispatch();
  const { name, price, id, image } = prod;
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className={style.product}>
      <div ref={ref}>
        {!inView ? (
          <div className={style.img}></div>
        ) : (
          <img className={style.img} src={!image ? default_img : image} />
        )}
      </div>
      <div className={style.titleDesc}>
        <div className={style.title}>{textCut(name, 30)}</div>
        <Link
          to={`/${!schema ? 10 : schema}/${!store_id ? 1 : store_id}/products/${id}`}
          className={style.description}
        >
          Подробнее...
        </Link>
      </div>
      <div className={style.purchase}>
        <span className={style.price}>{price} руб</span>
        {ifCart && ifCart.quantity !== 0 ? (
          <div className={style.counterContainer}>
            <Counter id={id}>{ifCart.quantity}</Counter>
          </div>
        ) : (
          <div className={style.addButtonContainer}>
            <AddButton onClick={() => dispatch(addProduct(id))} text={'Добавить'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
