import { FC } from 'react';
import style from './AddButton.module.scss';

interface IAddButton {
  onClick: () => void;
  text: string;
}

const AddButton: FC<IAddButton> = (props: IAddButton) => {
  return (
    <button {...props} className={style.button}>
      {props.text}
    </button>
  );
};
export default AddButton;
