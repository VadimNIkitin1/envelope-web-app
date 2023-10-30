import { FC } from 'react';

import { toggleTabs } from '../../store/activeSlice';
import { ICategory } from '../../store/types';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import style from './CategoriesItem.module.scss';

interface ICategoriesItem {
  category: ICategory;
  index: number;
}

const CategoriesItem: FC<ICategoriesItem> = ({ category, index }) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.activeTab.active);

  return (
    <a
      className={activeTab === index ? style.categoryActive : style.category}
      href={`#${category.name_rus}`}
      onClick={() => dispatch(toggleTabs(index))}
    >
      {category.name_rus}
    </a>
  );
};

export default CategoriesItem;
