import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import './Categories.scss';

import { makeUniqueGetShopCategories } from '../../redux/selectors';

const Categories = ({ categories, isMobileScreen }) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = e => {
      // if element clicked is inside of ref and it's nodeName is not LI,
      // don't do anything

      if (ref.current.contains(e.target) && e.target.nodeName !== 'LI') return;

      setDropdownVisibility(false);
    };

    if (!dropdownVisibility) return;

    document.body.addEventListener('click', onBodyClick);

    return () => document.body.removeEventListener('click', onBodyClick);
  }, [dropdownVisibility]);

  const renderCategories = categories.map(category => {
    return <li key={category}>{category}</li>;
  });

  return (
    <>
      <div
        className="categories-header"
        onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        Categories
      </div>
      <div
        ref={ref}
        className={`categories-wrapper ${!isMobileScreen ? 'not-mobile' : ''} ${
          dropdownVisibility ? 'visible' : ''
        }`}>
        <ul className="categories-list">{renderCategories}</ul>
      </div>
    </>
  );
};

// mapMapState is needed for correct memoization if ownProps is used

const makeMapState = state => {
  const getShopCategories = makeUniqueGetShopCategories(state);

  // if a func is returned from mapState connect automatically calls it

  const mapState = () => ({
    categories: getShopCategories(state),
  });

  return mapState;
};

export default connect(makeMapState)(Categories);
