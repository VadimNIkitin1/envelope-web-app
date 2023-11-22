import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import style from './CategoriesList.module.scss';

const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const activeTab = useAppSelector((state) => state.activeTab.active);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current && categories[activeTab]) {
      //@ts-ignore
      const activeTabElement = listRef.current.children[activeTab];

      const scrollDirection =
        //@ts-ignore
        activeTabElement.offsetLeft > listRef.current.scrollLeft ? 'right' : 'left';

      if (
        (scrollDirection === 'right' &&
          activeTabElement.offsetLeft + activeTabElement.offsetWidth >
            //@ts-ignore
            listRef.current.offsetWidth + listRef.current.scrollLeft) ||
        //@ts-ignore
        (scrollDirection === 'left' && activeTabElement.offsetLeft < listRef.current.scrollLeft)
      ) {
        //@ts-ignore
        listRef.current.scrollTo({
          left:
            scrollDirection === 'right'
              ? activeTabElement.offsetLeft
              : //@ts-ignore
                activeTabElement.offsetLeft - listRef.current.offsetWidth,
          behavior: 'smooth',
        });
      }
    }
  }, [activeTab, categories]);

  return (
    <div className={style.list} ref={listRef}>
      {categories === undefined || categories.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        categories.map((category, index) => (
          <a
            key={category.id}
            className={activeTab === index ? style.categoryActive : style.category}
            href={`#${category.name}`}
          >
            {category.name}
          </a>
        ))
      )}
    </div>
  );
};

export default CategoriesList;
