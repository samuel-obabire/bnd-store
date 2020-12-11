import { useState } from 'react';

import './SearchBar.scss';

import { ReactComponent as SearchIcon } from '../../asset/search-icon.svg';

const SearchBar = () => {
  const [term, setTerm] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="search-bar">
      <input
        placeholder="Search for a product"
        type="text"
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
