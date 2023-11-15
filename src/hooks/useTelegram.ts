const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg.close();
  };

  const initData = new URLSearchParams(tg?.initData);
  const initDataHash = initData.get('hash');

  return {
    onClose,
    tg,
    initDataHash,
    id: tg.initDataUnsafe?.user?.id,
    queryId: tg.initDataUnsafe?.query_id,
  };
};
