import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { RouterProvider } from 'react-router-dom';

import './App.css';

import router from './router';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  return (
    <div className={'app'}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
