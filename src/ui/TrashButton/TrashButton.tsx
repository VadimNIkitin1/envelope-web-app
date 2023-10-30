import { FC } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './TrashButton.module.scss';

interface Props {
  onClick: () => void;
}

const TrashButton: FC<Props> = (props: Props) => {
  return (
    <button className={style.button} {...props}>
      <BsFillTrashFill />
    </button>
  );
};

export default TrashButton;
