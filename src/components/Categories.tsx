import { selectFilter, setCategoryId } from '../redux/reducers/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const categoriesData: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые'];

function Categories(): JSX.Element {
  const dispatch = useDispatch();
  const { category } = useSelector(selectFilter);
  const setCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  return (
    <div className="categories">
      <div className="categories__list">
        {categoriesData.map((item, i) =>
          <button
            key={i}
            onClick={() => setCategory(i)}
            className={category === i || i === 0 && !category ? 'categories__item categories__item_active' : 'categories__item'}
          >
            {item}
          </button>,
        )}
      </div>
    </div>
  );
}

export default Categories;
