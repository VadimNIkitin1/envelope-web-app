import { Link } from 'react-router-dom';
import style from './OrderTypes.module.scss';
import { schema, store_id } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { checkOrderType } from '../../store/activeSlice';
import dinein from '../../public/dinein.svg';
import takeaway from '../../public/takeaway.svg';
import delivery from '../../public/delivery.svg';
import { ORDER_TYPE } from './OrderTypes.data';

const OrderTypes = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.page}>
      <div className={style.container}>
        <h1>Выберите способ заказа</h1>
        <Link
          to={`/${!schema ? 1 : schema}/${!store_id ? 1 : store_id}/products`}
          style={{ textDecoration: 'none' }}
          onClick={() => dispatch(checkOrderType(ORDER_TYPE.DINEIN))}
        >
          <div className={style.img_container}>
            <img src={dinein} alt="dinein" width={'120px'} height={'120px'} />
            <p className={style.text}>В зале</p>
          </div>
        </Link>
        <Link
          to={`/${!schema ? 1 : schema}/${!store_id ? 1 : store_id}/products`}
          style={{ textDecoration: 'none' }}
          onClick={() => dispatch(checkOrderType(ORDER_TYPE.TAKEAWAY))}
        >
          <div className={style.img_container}>
            <img src={takeaway} alt="takeaway" width={'100px'} height={'100px'} />
            <p className={style.text}>Самовывоз</p>
          </div>
        </Link>
        <Link
          to={`/${!schema ? 1 : schema}/${!store_id ? 1 : store_id}/products`}
          style={{ textDecoration: 'none' }}
          onClick={() => dispatch(checkOrderType(ORDER_TYPE.DELIVERY))}
        >
          <div className={style.img_container}>
            <img src={delivery} alt="delivery" width={'120px'} height={'120px'} />
            <p className={style.text}>Доставка</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderTypes;
