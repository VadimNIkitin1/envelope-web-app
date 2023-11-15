import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };

  const initData = new URLSearchParams(tg?.initData);
  const initDataHash = initData.get('hash');

  // const onToggleBackButton = (cb: any) => {
  //   useEffect(() => {
  //     tg.BackButton.show().onClick(cb);
  //     return () => {
  //       tg.BackButton.offClick(cb);
  //     };
  //   }, []);
  // };

  return {
    onClose,
    // onToggleBackButton,
    tg,
    initDataHash,
    id: tg.initDataUnsafe?.user?.id,
    queryId: tg.initDataUnsafe?.query_id,
  };
};
