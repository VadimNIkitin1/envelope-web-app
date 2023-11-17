import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleTabs } from '../../store/activeSlice';

import style from './CategoriesList.module.scss';

const CategoriesList = ({ categories, activeTab }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.list}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        categories.map((category, index) => (
          <a
            key={category.id}
            className={activeTab === index ? style.categoryActive : style.category}
            href={`#${category.name}`}
            onClick={() => dispatch(toggleTabs(index))}
          >
            {category.name}
          </a>
        ))
      )}
    </div>
  );
};

export default CategoriesList;
