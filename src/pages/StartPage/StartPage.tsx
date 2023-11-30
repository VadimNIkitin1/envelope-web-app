import { useState } from 'react';
import style from './StartPage.module.scss';
import OrderTypes from '../../components/OrderTypes/OrderTypes';

const StartPage = () => {
  const [preloader, setPreloader] = useState(true);

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
          <OrderTypes />
        </>
      )}
    </div>
  );
};

export default StartPage;
