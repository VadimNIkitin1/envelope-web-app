import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import router from './router';
import style from './App.module.scss';

function App() {
  const [preloader, setPreloader] = useState(true);
  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  setTimeout(() => {
    setPreloader(false);
  }, 500);

  return (
    <div className={style.app}>
      {preloader ? (
        <div className={style.preloader}>
          <div className={style.loader}>ENVELOPE</div>
        </div>
      ) : (
        <>
          <div className={style.preloader_done}>
            <div className={style.loader_done}>ENVELOPE</div>
          </div>

          <RouterProvider router={router} />
        </>
      )}
    </div>
  );
}

export default App;
