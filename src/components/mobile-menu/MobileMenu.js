import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './MobileMenu.scss'

import { getMobileMenuVisibility } from '../../redux/selectors'
import { setMobileMenuVisiblity } from '../../redux/actions'
import Categories from '../categories/Categories'
import logo from '../../asset/logo.jpg'

const MobileMenu = ({ visibility, setMobileMenuVisiblity }) => {
  const history = useHistory()

  const visible = visibility ? 'visible' : ''

  return createPortal(
    <>
      <div
        className={`mobile-menu-overlay ${visible}`}
        onClick={() => setMobileMenuVisiblity()}></div>
      <div className={`mobile-menu ${visible}`}>
        <div
          className="mobile-logo"
          onClick={() => {
            setMobileMenuVisiblity()

            history.push('/')
          }}>
          <img src={logo} alt="bnd clothings logo" />
        </div>
        <hr />
        <Categories isMobileScreen={true} />
        <hr />
      </div>
    </>,
    document.querySelector('#mobile-menu')
  )
}

const mapState = state => {
  return {
    visibility: getMobileMenuVisibility(state)
  }
}

export default connect(mapState, { setMobileMenuVisiblity })(MobileMenu)
