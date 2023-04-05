import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

const categoriesData = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const dispatch = useDispatch();
  const { category } = useSelector(selectFilter);

  return (
    <div className="categories">
      <div className="categories__list">
        {categoriesData.map((item, i) => (
          <button
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={category === i ? 'categories__item categories__item_active' : `categories__item`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
