import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Breakpoint } from 'react-socks'

import './Header.scss'

import { ReactComponent as MenuBar } from '../../asset/3-bars.svg'
import { ReactComponent as CartIcon } from '../../asset/cart-icon.svg'
import SearchBar from '../../components/search-bar/SearchBar'

import logo from '../../asset/logo.jpg'
import { setMobileMenuVisiblity } from '../../redux/actions'
import MobileMenu from '../../components/mobile-menu/MobileMenu'
import Categories from '../categories/Categories'
import User from '../user/User'

const Header = ({ setMobileMenuVisiblity, productCount }) => {
  const history = useHistory()

  const onSearchSubmit = term => {
    history.push(
      `/shop/collection/${term}?field=indexes&q=${term.toUpperCase()}`
    )
  }

  return (
    <div className="container">
      <nav className="header-nav">
        <Breakpoint className="menu-bar" small down>
          <div className="nav-item  menu-bar">
            <MenuBar
              className="icon"
              onClick={() => setMobileMenuVisiblity()}
            />
            <MobileMenu />
          </div>
        </Breakpoint>
        <Breakpoint medium up className="store-logo">
          <div className="store-logo" onClick={() => history.push('/')}>
            <img src={logo} alt="bnd clothings logo" />
          </div>
        </Breakpoint>
        <SearchBar className="icon" onSearchSubmit={onSearchSubmit} />
        <div className="right-sided-nav-items">
          <Breakpoint medium up>
            <div className="nav-item shop-categories">
              <Categories isMobileScreen={false} />
            </div>
          </Breakpoint>
          <div
            className="nav-item  cart-icon"
            onClick={() => history.push('/cart')}>
            <CartIcon />
            {productCount ? (
              <span className="item-count">{productCount}</span>
            ) : null}
          </div>
          <User />
        </div>
      </nav>
    </div>
  )
}

const mapState = ({ cart: { cartItems: cart } }) => {
  const productCount = cart.reduce((acc, curr) => {
    return acc + curr.quantity
  }, 0)

  return { productCount }
}

export default connect(mapState, { setMobileMenuVisiblity })(Header)
