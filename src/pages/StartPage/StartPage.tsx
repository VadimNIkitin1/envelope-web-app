import { useEffect } from 'react';
import style from './StartPage.module.scss';
import OrderTypes from '../../components/OrderTypes/OrderTypes';
import { getProducts } from '../../store/productsSlice';
import { addTgUser } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTelegram } from '../../hooks/useTelegram';
import { getCategories } from '../../store/categoriesSlice';
import { setSplashScreen } from '../../store/activeSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

const StartPage = () => {
  const dispatch = useAppDispatch();
  const splashScreen = useAppSelector((state) => state.activeTab.splashScreen);
  const { tg, id, first_name, last_name, username, is_premium } = useTelegram();

  useEffect(() => {
    dispatch(getCategories());
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
  }, []);

  useEffect(() => {
    tg.BackButton.hide();
    tg.MainButton.hide();
  }, []);

  setTimeout(() => {
    dispatch(setSplashScreen(false));
  }, 1000);

  return (
    <div>
      {splashScreen ? (
        <div className={style.splashScreen}>
          <div className={style.loader}>ENVELOPE</div>
        </div>
      ) : (
        <>
          <div className={style.splashScreen_done}>
            <div className={style.loader_done}>ENVELOPE</div>
          </div>
          <OrderTypes />
        </>
      )}
    </div>
  );
};

export default StartPage;
