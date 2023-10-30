import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import router from './router';

import './App.css';

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
