import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useCart } from '../../hooks/useCart';

import { getProductById } from '../../store/productsSlice';
import { addProduct, getCart } from '../../store/cartSlice';

import AddButton from '../../ui/AddButton/AddButton';
import Counter from '../../ui/Counter/Counter';

import style from './ProductPage.module.scss';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.quantity);
  const product = useAppSelector((state) => state.products.product);
  const { id } = useParams();
  const { onToggleBackButton } = useTelegram();
  const { goBack } = useAppNavigate();
  const { targetProd } = useCart(id);

  const { description, name_rus, webp_image_url } = product;

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, [quantity]);

  onToggleBackButton(goBack);

  return (
    <div className={style.productPage}>
      <img className={style.img} src={webp_image_url} />
      <h1 className={style.name}>{name_rus}</h1>
      <i className={style.description}>{description}</i>
      <div>
        {targetProd.length > 0 ? (
          <div className={style.counterContainer}>
            <Counter id={id}>{targetProd[0].quantity}</Counter>
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

export default ProductPage;
