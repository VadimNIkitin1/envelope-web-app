import { useAppSelector } from '../../hooks/useAppSelector';
import CategoriesItem from '../CategoriesItem/CategoriesItem';

import style from './CategoriesList.module.scss';

const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className={style.list}>
      {categories.map((category, index) => (
        <CategoriesItem key={category.name_rus} category={category} index={index} />
      ))}
    </div>
  );
};

export default CategoriesList;
