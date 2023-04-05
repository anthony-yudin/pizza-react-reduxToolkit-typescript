import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSort } from '../redux/slices/filterSlice';

export const sortData = [
  {
    title: 'Сначала недорогие',
    property: 'priceDefault',
  },
  {
    title: 'Сначала дорогие',
    property: '-priceDefault',
  },
  {
    title: 'Сначала популярные',
    property: '-rating',
  },
];

function Sort() {
  const dispatch = useDispatch();
  const { sort } = useSelector(selectFilter);

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка:</b>
        <span className="sort__label-text">
          {sort?.title ? sort.title : 'asd'}
          <div className="sort__popup">
            <ul className="sort__item-list">
              {sortData.map((item, i) => (
                <li
                  key={i}
                  onClick={() => dispatch(setSort(sortData[i]))}
                  className={item.property === sort?.property ? 'sort__item sort__item_active' : 'sort__item'}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Sort;
