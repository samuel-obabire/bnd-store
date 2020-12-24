import { useRef, useState } from 'react';

import './SearchBar.scss';

import { ReactComponent as SearchIcon } from '../../asset/search-icon.svg';

const SearchBar = ({ onSearchSubmit }) => {
  const [term, setTerm] = useState('');
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();

    if (term === '') return;

    onSearchSubmit(term);

    setTerm('');
    inputRef.current.blur();
  };

  return (
    <form onSubmit={onSubmit} className="search-bar">
      <input
        ref={inputRef}
        placeholder="Search product"
        type="search"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
