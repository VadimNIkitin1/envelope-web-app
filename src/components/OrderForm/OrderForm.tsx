import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ISubmitForm, sendOrder } from '../../store/cartSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTelegram } from '../../hooks/useTelegram';

import style from './OrderForm.module.scss';

import { Button } from '../../ui/Button/Button';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ORDER_TYPE } from '../OrderTypes/OrderTypes.data';
import { useAppNavigate } from '../../hooks/useAppNavigate';

const OrderForm = ({ cart }) => {
  const dispatch = useAppDispatch();
  const { tg, onClose, id } = useTelegram();
  const { goBack } = useAppNavigate();
  const order_type = useAppSelector((state) => state.activeTab.order_type);

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
      {order_type === ORDER_TYPE.DINEIN && (
        <>
          <input
            className={style.input}
            placeholder="Имя"
            {...register('customer_name', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <p className={style.errorMsg}>{errors?.customer_name && errors.customer_name.message}</p>
          <input
            className={style.input}
            type="number"
            placeholder="Телефон"
            {...register('customer_phone', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <input
            className={style.input}
            placeholder="Стол №"
            type="number"
            {...register('customer_table', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <p className={style.errorMsg}>
            {errors?.customer_table && errors.customer_table.message}
          </p>
        </>
      )}
      {order_type === ORDER_TYPE.TAKEAWAY && (
        <>
          <input
            className={style.input}
            placeholder="Имя"
            {...register('customer_name', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <p className={style.errorMsg}>{errors?.customer_name && errors.customer_name.message}</p>
          <input
            className={style.input}
            type="number"
            placeholder="Телефон"
            {...register('customer_phone', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
        </>
      )}
      {order_type === ORDER_TYPE.DELIVERY && (
        <>
          <input
            className={style.input}
            placeholder="Имя"
            {...register('customer_name', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <p className={style.errorMsg}>{errors?.customer_name && errors.customer_name.message}</p>
          <input
            className={style.input}
            type="number"
            placeholder="Телефон"
            {...register('customer_phone', {
              required: 'Это поле обязательно для заполнения!',
            })}
          />
          <p className={style.errorMsg}>
            {errors?.customer_phone && errors.customer_phone.message}
          </p>
          <input
            className={style.input}
            type="text"
            placeholder="Город"
            {...register('delivery_city')}
          />
          <p className={style.errorMsg}>{errors?.delivery_city && errors.delivery_city.message}</p>
          <input
            className={style.input}
            type="text"
            placeholder="Адрес"
            {...register('delivery_address')}
          />
          <p className={style.errorMsg}>
            {errors?.delivery_address && errors.delivery_address.message}
          </p>
        </>
      )}
      <textarea
        className={style.textarea}
        placeholder="Коментарий..."
        {...register('customer_comment')}
      />
      {errors.customer_comment && (
        <p className={style.errorMsg}>{errors?.customer_comment.message}</p>
      )}
      {!id && <Button onClick={handleSubmit(onSubmit)} children="Заказать" view="add" />}
      {!id && <Button onClick={goBack} children="Назад" view="add" />}
    </form>
  );
};

export default OrderForm;
