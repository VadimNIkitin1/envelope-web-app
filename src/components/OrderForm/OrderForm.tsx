import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ISubmitForm, sendOrder } from '../../store/cartSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTelegram } from '../../hooks/useTelegram';

import style from './OrderForm.module.scss';

import { Button } from '../../ui/Button/Button';

const OrderForm = ({ cart }) => {
  const dispatch = useAppDispatch();
  const { tg, onClose, id } = useTelegram();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISubmitForm>();

  const onSubmit: SubmitHandler<ISubmitForm> = useCallback(
    async (data: ISubmitForm) => {
      const requestData = {
        ...data,
      };

      await dispatch(sendOrder(requestData));

      onClose();
    },
    [cart]
  );

  const mainButtonSubmitHandler = handleSubmit(onSubmit);

  useEffect(() => {
    if (isValid) {
      tg.MainButton.setParams({
        text: 'Заказать',
      })
        .show()
        .onClick(mainButtonSubmitHandler);
    } else {
      tg.MainButton.hide();
    }
    return () => {
      tg.MainButton.offClick(mainButtonSubmitHandler);
    };
  }, [isValid]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={style.input}
        placeholder="Имя"
        {...register('customer_name', {
          required: 'Это поле обязательно для заполнения!',
        })}
      />
      {errors?.customer_name && <p className={style.errorMsg}>{errors.customer_name.message}</p>}
      <input
        className={style.input}
        type="number"
        placeholder="Телефон"
        {...register('customer_phone', {
          required: 'Это поле обязательно для заполнения!',
        })}
      />
      {errors.customer_phone && <p className={style.errorMsg}>{errors.customer_phone.message}</p>}
      <input
        className={style.input}
        type="text"
        placeholder="Город"
        {...register('delivery_city')}
      />
      {errors.delivery_city && <p className={style.errorMsg}>{errors.delivery_city.message}</p>}
      <input
        className={style.input}
        type="text"
        placeholder="Адрес"
        {...register('delivery_address')}
      />
      {errors.delivery_address && (
        <p className={style.errorMsg}>{errors.delivery_address.message}</p>
      )}
      {!id && <Button onClick={handleSubmit(onSubmit)} children="Заказать" view="add" />}
    </form>
  );
};

export default OrderForm;
