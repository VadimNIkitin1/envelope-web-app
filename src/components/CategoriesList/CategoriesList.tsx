import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import style from './CategoriesList.module.scss';

const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const activeTab = useAppSelector((state) => state.activeTab.active);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && categories[activeTab]) {
      const activeTabElement = listRef.current.children[activeTab] as HTMLElement;

      const scrollDirection =
        activeTabElement.offsetLeft > listRef.current.scrollLeft ? 'right' : 'left';

      if (
        (scrollDirection === 'right' &&
          activeTabElement.offsetLeft + activeTabElement.offsetWidth >
            listRef.current.offsetWidth + listRef.current.scrollLeft) ||
        (scrollDirection === 'left' && activeTabElement.offsetLeft < listRef.current.scrollLeft)
      ) {
        listRef.current.scrollTo({
          left:
            scrollDirection === 'right'
              ? activeTabElement.offsetLeft
              : activeTabElement.offsetLeft - listRef.current.offsetWidth,
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
        <>
          <a href="#Популярное" className={activeTab === 0 ? style.categoryActive : style.category}>
            Популярное
          </a>
          {categories.map((category, index) => (
            <a
              key={category.id}
              className={activeTab === index + 1 ? style.categoryActive : style.category}
              href={`#${category.name}`}
            >
              {category.name}
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoriesList;
