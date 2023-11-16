import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useCart } from '../../hooks/useCart';
import { contains } from '../../utils/contains';
import { textCut } from '../../utils/textCut';
import { addProduct } from '../../store/cartSlice';
import AddButton from '../../ui/AddButton/AddButton';
import Counter from '../../ui/Counter/Counter';
import default_img from '../../public/default_img.png';

import style from './ProductItem.module.scss';

const ProductItem = ({ prod }: any) => {
  const dispatch = useAppDispatch();
  const { cartArr, cartQuantity } = useCart();
  const { name, price, id, image } = prod;

  return (
    <div className={style.product}>
      <img className={style.img} src={!image ? default_img : image} />
      <div className={style.titleDesc}>
        <div className={style.title}>{textCut(name, 30)}</div>
        <Link to={`/products/${id}`} className={style.description}>
          Подробнее...
        </Link>
      </div>
      <div className={style.purchase}>
        <span className={style.price}>{price} руб</span>
        {contains(cartArr, id) ? (
          <div className={style.counterContainer}>
            <Counter id={id}>{cartQuantity[cartArr.indexOf(id)]}</Counter>
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
