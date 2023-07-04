import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { selectFilter, setSearch } from '../redux/reducers/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../redux/store';
import debounce from 'lodash.debounce';
import logo from '../assets/img/pizza-logo.svg';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { title } = useSelector(selectFilter);
  const { totalPriceBasket, totalCountBasket } = useSelector((state: TRootState) => state.basket);
  const [searchInputValue, setSearchInputValue] = React.useState<string>(title || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!title) {
      setSearchInputValue('');
    } else {
      setSearchInputValue(title);
    }
  }, [title]);

  function clearInput(): void {
    setSearchInputValue('');
    dispatch(setSearch(''));
    inputRef.current?.focus();
  }

  const setSearchRequest = React.useCallback(
    debounce((str: string): void => {
      dispatch(setSearch(str));
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 700),
    [],
  );

  function observeChangeInputSearch(evt: React.ChangeEvent<HTMLInputElement>): void {
    const target :string = evt.target.value;

    setSearchInputValue(target);
    setSearchRequest(target);
  }

  return (
    <header className='header'>
      <div className='container'>
        <Link to='/' className='header__logo'>
          <img width='38' src={logo} alt='Pizza logo' />
          <div>
            <h1>{'React Pizza'}</h1>
            <p>{'самая вкусная пицца во вселенной'}</p>
          </div>
        </Link>
        {pathname !== '/basket/'
          && <div className='header__right'>
            <div className='header__search'>
              <input value={searchInputValue} onChange={observeChangeInputSearch} className='header__search-input' ref={inputRef} />

              {searchInputValue
                && <svg
                  height='48'
                  viewBox='0 0 48 48'
                  width='48'
                  xmlns='http://www.w3.org/2000/svg'
                  className='header__search-close'
                  onClick={clearInput}
                >
                  <path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z' />
                  <path d='M0 0h48v48h-48z' fill='none' />
                </svg>
              }

              <svg className='header__search-icon' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                <title />
                <g id='search'>
                  <path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
                </g>
              </svg>
            </div>

            <div className='header__cart'>
              <Link to='/basket/' className='button button--cart'>
                <span>{`${totalPriceBasket} ₽`}</span>
                <div className='button__delimiter' />
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z'
                    stroke='white'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z'
                    stroke='white'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669'
                    stroke='white'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>{totalCountBasket}</span>
              </Link>
            </div>
          </div>
        }
      </div>
    </header>
  );
}

export default Header;
