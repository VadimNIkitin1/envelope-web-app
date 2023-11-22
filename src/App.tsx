import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import router from './router';
import style from './App.module.scss';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  return (
    <div className={style.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
