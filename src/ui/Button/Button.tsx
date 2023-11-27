import { FC, ReactNode } from 'react';

import style from './Button.module.scss';
import { BsFillTrashFill } from 'react-icons/bs';
import clsx from 'clsx';

interface IButton {
  children?: ReactNode;
  onClick: () => void;
  view: string;
}

const Button: FC<IButton> = ({ children, view, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        style.add,
        view === 'plus' && style.plus,
        view === 'minus' && style.minus,
        view === 'trash' && style.trash
      )}
    >
      {view === 'trash' ? <BsFillTrashFill /> : children}
    </button>
  );
};

export { Button };
