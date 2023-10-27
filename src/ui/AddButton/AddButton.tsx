import { FC } from 'react';
import style from './AddButton.module.css';

interface IAddButton {
  text: string;
}

const AddButton: FC<IAddButton> = (props) => {
  return (
    <button {...props} className={style.button}>
      {props.text}
    </button>
  );
};
export default AddButton;
