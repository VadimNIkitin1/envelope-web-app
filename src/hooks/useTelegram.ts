interface IWindow extends Window {
  Telegram?: any;
}
const tg = (window as IWindow).Telegram.WebApp;

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
    username: tg.initDataUnsafe?.user?.username,
    first_name: tg.initDataUnsafe?.user?.first_name,
    last_name: tg.initDataUnsafe?.user?.last_name,
    is_premium: tg.initDataUnsafe?.user?.is_premium,
  };
};
