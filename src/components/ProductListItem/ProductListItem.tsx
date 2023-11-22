import { useInView } from 'react-intersection-observer';
import ProductItem from '../ProductItem/ProductItem';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleTabs } from '../../store/activeSlice';
import style from './ProductListItem.module.scss';

const ProductListItem = ({ category, products, index, cart }) => {
  const dispatch = useAppDispatch();

  const [ref] = useInView({
    threshold: 0.5,
    onChange(inView, entry) {
      if (inView) {
        //@ts-ignore
        dispatch(toggleTabs(Number(entry?.target.tabIndex)));
      }
    },
  });

  return (
    <div className={style.listElement} key={category.id} ref={ref} tabIndex={index}>
      <h3 id={`${category.name}`} className={style.categoryName}>
        {category.name}
      </h3>
      {products === undefined || products.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        products
          .filter((prod) => prod.category_id === category.id)
          .map((prod) => (
            <ProductItem
              prod={prod}
              key={prod.id}
              ifCart={cart.filter((i) => i.id === prod.id)[0]}
            />
          ))
      )}
    </div>
  );
};

export { ProductListItem };
