import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ISubmitForm, clearCart, sendOrder, trigerRender } from '../../store/cartSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTelegram } from '../../hooks/useTelegram';
import { tg_user_id, store_id } from '../../store/cartSlice';

import style from './OrderForm.module.scss';
import AddButton from '../../ui/AddButton/AddButton';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useAppSelector } from '../../hooks/useAppSelector';

const OrderForm = ({ cart }) => {
  const dispatch = useAppDispatch();
  const { tg, onClose } = useTelegram();
  const { goBack } = useAppNavigate();
  const { error } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISubmitForm>();

  const onSubmit: SubmitHandler<ISubmitForm> = useCallback(
    async (data: ISubmitForm) => {
      const requestData = {
        tg_user_id: !tg_user_id ? 1132630506 : tg_user_id,
        store_id: !store_id ? 1 : store_id,
        ...data,
      };

      await dispatch(sendOrder(requestData));

      if (!error) {
        onClose();
      } else {
        return;
      }
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
      <AddButton onClick={handleSubmit(onSubmit)} text="Заказать" />
      {error && <p>Что то пошло не так! Попробуйте еще раз!</p>}
    </form>
  );
};

export default OrderForm;
