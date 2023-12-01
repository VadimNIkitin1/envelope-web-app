import { useInView } from 'react-intersection-observer';
import ProductItem from '../ProductItem/ProductItem';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleTabs } from '../../store/activeSlice';
import style from './ProductListItem.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ORDER_TYPE } from '../OrderTypes/OrderTypes.data';

const ProductListItem = ({ category, index }) => {
  const products = useAppSelector((state) => state.products.products);
  const cart = useAppSelector((state) => state.cart.cart_items);
  const order_type = useAppSelector((state) => state.activeTab.order_type);
  const dispatch = useAppDispatch();

  const filteredProducts = (products) => {
    if (order_type === ORDER_TYPE.DINEIN) {
      return products.filter((product) => product.dinein === true);
    }

    if (order_type === ORDER_TYPE.TAKEAWAY) {
      return products.filter((product) => product.takeaway === true);
    }

    if (order_type === ORDER_TYPE.DELIVERY) {
      return products.filter((product) => product.delivery === true);
    }
  };

  const [ref] = useInView({
    threshold: 0.5,
    onChange(inView) {
      if (inView) {
        dispatch(toggleTabs(index));
      }
    },
  });

  return (
    <div className={style.listElement} key={category.id} ref={ref}>
      <h3 id={`${category.name}`} className={style.categoryName}>
        {category.name}
      </h3>
      {products === undefined || products.length === 0 ? (
        <p className={style.message}>Нет добавленых элементов</p>
      ) : (
        filteredProducts(products)
          .filter((prod) => prod.category_id === category.id)
          .filter((prod) => prod.popular === false)
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
