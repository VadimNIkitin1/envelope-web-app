import { useEffect, useState } from 'react';
import style from './StartPage.module.scss';
import OrderTypes from '../../components/OrderTypes/OrderTypes';
import { getProducts } from '../../store/productsSlice';
import { addTgUser } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTelegram } from '../../hooks/useTelegram';
import { getCategories } from '../../store/categoriesSlice';
import { showSplashScreen } from '../../store/activeSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

const StartPage = () => {
  const dispatch = useAppDispatch();
  const { tg, id, first_name, last_name, username, is_premium } = useTelegram();
  const [preloader, setPreloader] = useState(true);
  const splashScreen = useAppSelector((state) => state.activeTab.showSplashScreen);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(
      addTgUser({
        tg_user_id: !id ? 1132630506 : id,
        first_name: !first_name ? '-' : first_name,
        last_name: !last_name ? '-' : last_name,
        username: !username ? '-' : username,
        is_premium: !is_premium ? false : is_premium,
      })
    );
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    tg.BackButton.hide();
  }, []);

  setTimeout(() => {
    setPreloader(false);
    dispatch(showSplashScreen(true));
  }, 1000);

  return (
    <div>
      {preloader && !splashScreen ? (
        <div className={style.preloader}>
          <div className={style.loader}>ENVELOPE</div>
        </div>
      ) : (
        <>
          <div className={style.preloader_done}>
            <div className={style.loader_done}>ENVELOPE</div>
          </div>
          <OrderTypes />
        </>
      )}
    </div>
  );
};

export default StartPage;
