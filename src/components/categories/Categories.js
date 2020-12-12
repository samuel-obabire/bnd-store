import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeUniqueGetShopCategories } from '../../redux/selectors';
import './Categories.scss';

const Categories = ({ categories, isMobileScreen }) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  useEffect(() => {
    const onBodyClick = () => {
      setDropdownVisibility(false);
    };

    if (!dropdownVisibility) return;

    document.body.addEventListener('click', onBodyClick);

    return () => document.body.removeEventListener('click', onBodyClick);
  }, [dropdownVisibility]);

  const renderCategories = categories.map(category => {
    return <li>{category}</li>;
  });

  return (
    <>
      <div
        className="categories-header"
        onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        Categories
      </div>
      <div
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

  // if a fun is returned from mapState connect automatically calls it

  const mapState = () => ({
    categories: getShopCategories(state),
  });

  return mapState;
};

export default connect(makeMapState)(Categories);
