import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setFilters, filterInitialState } from '../redux/slices/filterSlice';
import qs from 'qs';

import Categories from './Categories';
import Sort, { sortData } from './Sort';
import Cart from './Cart';
import SkeletonCart from './SkeletonCart';

function Main() {
  const dispatch = useDispatch();
  const { category, sort, searchInputValueRequest } = useSelector(state => state.filter);
  const navigate = useNavigate();
  const isMountCarts = React.useRef(false);
  const isGetRequest = React.useRef(false);
  let filterString = '';

  const [carts, setCarts] = React.useState([]);
  const [isCartsLoading, setIsCartsLoading] = React.useState(false);

  React.useEffect(() => {
    const getRequest = window.location.search;

    if (getRequest) {
      const obj = qs.parse(getRequest.replace('?', ''));

      if (obj.sortBy) {
        obj.sortBy = sortData.find(item => item.property === (obj.order !== 'asc' ? '-' + obj.sortBy : obj.sortBy));
      }

      dispatch(
        setFilters({
          ...obj,
        })
      );

      isGetRequest.current = true;
    }
  }, []);

  React.useEffect(() => {
    const filterObj = {};

    if (category) {
      filterObj.category = category;
    } else {
      delete filterObj.category;
    }

    if (searchInputValueRequest) {
      filterObj.title = searchInputValueRequest;
    } else {
      delete filterObj.title;
    }

    if (sort?.property) {
      filterObj.sortBy = sort.property.replace('-', '');
    } else {
      delete filterObj.sortBy;
    }

    if (sort?.property?.includes('-')) {
      filterObj.order = 'desc';
    } else {
      filterObj.order = 'asc';
    }

    filterString = qs.stringify(filterObj);

    if (!isGetRequest.current) {
      setIsCartsLoading(false);

      axios
        .get(`https://6332a0d9573c03ab0b4ca71c.mockapi.io/items${filterString ? `?${filterString}` : ''}`)
        .then(res => {
          setCarts(res.data);
          setIsCartsLoading(true);
        })
        .catch(err => console.log(err));
    }

    isGetRequest.current = false;
  }, [category, sort, searchInputValueRequest]);

  React.useEffect(() => {
    const filterObj = qs.parse(filterString);

    if (
      isMountCarts.current &&
      (filterObj.order.includes('desc') ||
        filterObj.sortBy !== filterInitialState.sort.property.replace('-', '') ||
        Number(filterObj.category) ||
        filterObj.searchInputValueRequest)
    ) {
      navigate(`?${filterString}`);
    } else {
      navigate('');
    }

    isMountCarts.current = true;
  }, [category, sort, searchInputValueRequest]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isCartsLoading
          ? carts.map(item => <Cart {...item} key={item.types[0].id} />)
          : [...new Array(8)].map((_, i) => <SkeletonCart key={i} className="pizza-block" />)}
      </div>
    </div>
  );
}

export default Main;
