import './Header.scss';

import { ReactComponent as MenuBar } from '../../asset/3-bars.svg';
import { ReactComponent as CartIcon } from '../../asset/cart-icon.svg';
import { ReactComponent as UserIcon } from '../../asset/user-icon.svg';
import SearchBar from '../../components/search-bar/SearchBar';

const Header = () => {
  return (
    <div className="container">
      <nav className="header-nav">
        <div className="nav-icon menu-bar">
          <MenuBar />
        </div>
        <SearchBar />
        <div className="nav-icon cart-icon">
          <CartIcon />
        </div>
        <div className="nav-icon user-icon">
          <UserIcon />
        </div>
      </nav>
    </div>
  );
};

export default Header;
