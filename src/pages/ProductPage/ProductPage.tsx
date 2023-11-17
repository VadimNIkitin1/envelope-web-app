import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import { getProductById } from '../../store/productsSlice';
import { addProduct, getCart } from '../../store/cartSlice';

import AddButton from '../../ui/AddButton/AddButton';
import Counter from '../../ui/Counter/Counter';

import style from './ProductPage.module.scss';
import default_image from '../../public/default_img.png';
import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const render = useAppSelector((state) => state.cart.render);
  const product = useAppSelector((state) => state.products.product);
  const cart = useAppSelector((state) => state.cart.cart_items);
  const { tg } = useTelegram();
  const { goBack } = useAppNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  const ifCart = cart.filter((i) => i?.id === Number(id))[0];
  const { name, description, price, image, wt, unit, kilocalories, proteins, fats, carbohydrates } =
    product;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    tg.BackButton.show().onClick(goBack);
    return () => {
      tg.BackButton.offClick(goBack);
    };
  }, []);

  return (
    <div className={style.productPage}>
      <img className={style.img} src={!image ? default_image : image} />
      <h1 className={style.name}>{name}</h1>
      <i className={style.description}>{description}</i>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          marginBottom: '20px',
        }}
      >
        <p>Ккал: {kilocalories}</p>
        <p>Белки: {proteins}</p>
        <p>Жиры: {fats}</p>
        <p>Углеводы: {carbohydrates}</p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          columnGap: '20px',
        }}
      >
        <h2>{price} руб.</h2>
        {ifCart && ifCart.quantity !== 0 ? (
          <div className={style.counterContainer}>
            <Counter id={id}>{ifCart.quantity}</Counter>
          </div>
        ) : (
          <div className={style.addButtonContainer}>
            <AddButton onClick={() => dispatch(addProduct(id))} text={'Добавить'} />
          </div>
        )}
        <p>{wt + unit.name}</p>
      </div>
    </div>
  );
};

export default ProductPage;
