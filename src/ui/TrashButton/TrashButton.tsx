import { BsFillTrashFill } from 'react-icons/bs';
import style from './TrashButton.module.css';
import { FC } from 'react';

const TrashButton: FC = (props) => {
  return (
    <button className={style.button} onClick={props.onClick} {...props}>
      <BsFillTrashFill />
    </button>
  );
};

export default TrashButton;
