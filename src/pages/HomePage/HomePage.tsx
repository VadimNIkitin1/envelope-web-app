import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductList from '../../components/ProductList/ProductList';

import { useTelegram } from '../../hooks/useTelegram';
import { useAppNavigate } from '../../hooks/useAppNavigate';

import { addTgUser, getCart } from '../../store/cartSlice';
import { getProducts } from '../../store/productsSlice';
import { getCategories } from '../../store/categoriesSlice';
import style from './HomePage.module.scss';

const HomePage = () => {
  const [preloader, setPreloader] = useState(true);
  const dispatch = useAppDispatch();
  const { goToForm } = useAppNavigate();
  const { tg, id, first_name, last_name, username, is_premium } = useTelegram();

  const { cart_items, render } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(
      addTgUser({
        tg_user_id: !id ? 1132630506 : id,
        first_name: !first_name ? 'Вадим' : first_name,
        last_name: !last_name ? 'Никитин' : last_name,
        username: !username ? 'vadimnikitin1' : username,
        is_premium: !is_premium ? false : is_premium,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, [render]);

  useEffect(() => {
    tg.BackButton.hide();
    if (cart_items.length !== 0) {
      tg.MainButton.setParams({
        text: 'Перейти в корзину',
      })
        .show()
        .onClick(goToForm);
    } else {
      tg.MainButton.hide();
    }
    return () => {
      tg.MainButton.offClick(goToForm);
    };
  }, [cart_items]);

  setTimeout(() => {
    setPreloader(false);
  }, 1000);

  return (
    <div>
      {preloader ? (
        <div className={style.preloader}>
          <div className={style.loader}>ENVELOPE</div>
        </div>
      ) : (
        <>
          <div className={style.preloader_done}>
            <div className={style.loader_done}>ENVELOPE</div>
          </div>
          <CategoriesList />
          <ProductList />
        </>
      )}
    </div>
  );
};

export default HomePage;
