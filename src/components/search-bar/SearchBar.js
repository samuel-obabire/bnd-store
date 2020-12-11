import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './SearchBar.scss';

import { ReactComponent as SearchIcon } from '../../asset/search-icon.svg';
import { setSearchTerm } from '../../redux/actions/';

const SearchBar = ({ setSearchTerm }) => {
  const [term, setTerm] = useState('');
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();

    if (term === '') return;

    setSearchTerm(term.toLowerCase());
    setTerm('');

    history.push('/shop');
  };

  return (
    <form onSubmit={onSubmit} className="search-bar">
      <input
        placeholder="Search for a product"
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

export default connect(null, { setSearchTerm })(SearchBar);
