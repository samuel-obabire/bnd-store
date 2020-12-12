import { connect } from 'react-redux';
import { Breakpoint } from 'react-socks';

import './Header.scss';

import { ReactComponent as MenuBar } from '../../asset/3-bars.svg';
import { ReactComponent as CartIcon } from '../../asset/cart-icon.svg';
import { ReactComponent as UserIcon } from '../../asset/user-icon.svg';
import { ReactComponent as Logo } from '../../asset/bnd-logo.svg';
import SearchBar from '../../components/search-bar/SearchBar';
import { setMobileMenuVisiblity } from '../../redux/actions';
import MobileMenu from '../../components/mobile-menu/MobileMenu';
import { useEffect } from 'react';

const Header = ({ setMobileMenuVisiblity }) => {
  return (
    <div className="container">
      <nav className="header-nav">
        <Breakpoint small down>
          <div className="nav-icon  menu-bar">
            <MenuBar
              className="icon"
              onClick={() => setMobileMenuVisiblity()}
            />
            <MobileMenu />
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <Logo className="store-logo" />
        </Breakpoint>
        <SearchBar className="icon" />
        <div className="nav-icon  cart-icon">
          <CartIcon />
        </div>
        <div className="nav-icon  user-icon">
          <UserIcon className="icon" />
        </div>
      </nav>
    </div>
  );
};

export default connect(null, { setMobileMenuVisiblity })(Header);
