import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

import './Header.scss';

import { ReactComponent as MenuBar } from '../../asset/3-bars.svg';
import { ReactComponent as CartIcon } from '../../asset/cart-icon.svg';
import { ReactComponent as UserIcon } from '../../asset/user-icon.svg';
import { ReactComponent as Logo } from '../../asset/bnd-logo.svg';
import SearchBar from '../../components/search-bar/SearchBar';
import { setMobileMenuVisiblity, getProducts } from '../../redux/actions';
import MobileMenu from '../../components/mobile-menu/MobileMenu';
import Categories from '../categories/Categories';

const Header = ({ getProducts, setMobileMenuVisiblity }) => {
  const history = useHistory();

  const onSearchSubmit = term => {
    history.push(`/shop?field=indexes&q=${term.toUpperCase()}`);
  };

  return (
    <div className="container">
      <nav className="header-nav">
        <Breakpoint small down>
          <div className="nav-item  menu-bar">
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
        <SearchBar className="icon" onSearchSubmit={onSearchSubmit} />
        <div className="right-sided-nav-items">
          <Breakpoint medium up>
            <div className="nav-item shop-categories">
              <Categories isMobileScreen={false} />
            </div>
          </Breakpoint>
          <div className="nav-item  cart-icon">
            <CartIcon />
          </div>
          <div className="nav-item  user-icon">
            <UserIcon className="icon" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default connect(null, { setMobileMenuVisiblity, getProducts })(Header);
