import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ISubmitForm, clearCart, sendOrder } from '../../store/cartSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useTelegram } from '../../hooks/useTelegram';

import style from './OrderForm.module.scss';

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart_items);
  const { tg, id, onClose, initDataHash } = useTelegram();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISubmitForm>();

  const onSubmit: SubmitHandler<ISubmitForm> = useCallback(
    (data: ISubmitForm) => {
      const requestData = {
        cart: cart,
        name: data.name,
        phone: data.phone,
        user_id: id,
        initDataHash,
      };

      dispatch(sendOrder(requestData));
      dispatch(clearCart());
      reset();
      onClose();
    },
    [cart, dispatch, id, initDataHash, onClose, reset]
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
        {...register('name', {
          required: 'Это поле обязательно для заполнения!',
        })}
      />
      {errors?.name && <p className={style.errorMsg}>{errors.name.message}</p>}
      <input
        className={style.input}
        type="number"
        placeholder="Телефон"
        {...register('phone', {
          required: 'Это поле обязательно для заполнения!',
        })}
      />
      {errors.phone && <p className={style.errorMsg}>{errors.phone.message}</p>}
    </form>
  );
};

export default OrderForm;
