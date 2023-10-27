import { FC, ReactNode } from 'react';

interface ICounterButton {
  children: ReactNode;
  className: string;
  onClick: () => void;
}

const CounterButton: FC<ICounterButton> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default CounterButton;
