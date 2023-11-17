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
  }, 1000);

  return (
    <div className={style.app}>
      <div className={preloader ? style.preloader : style.preloader_done}>
        <div className={preloader ? style.loader : style.loader_done}>ENVELOPE</div>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
