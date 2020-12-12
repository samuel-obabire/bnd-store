import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './MobileMenu.scss';
// import { Link } from 'react-router-dom';

import { getMobileMenuVisibility } from '../../redux/selectors';
import { setMobileMenuVisiblity } from '../../redux/actions';
import { ReactComponent as Logo } from '../../asset/bnd-logo.svg';

const MobileMenu = ({ visibility, setMobileMenuVisiblity }) => {
  const history = useHistory();

  const visible = visibility ? 'visible' : '';

  return createPortal(
    <>
      <div
        className={`mobile-menu-overlay ${visible}`}
        onClick={() => setMobileMenuVisiblity()}></div>
      <div className={`mobile-menu ${visible}`}>
        <div
          className="logo"
          onClick={() => {
            setMobileMenuVisiblity();

            history.push('/');
          }}>
          <Logo />
        </div>
        <hr />
        <header>
          <h3>Categories</h3>
        </header>
        <ul>
          <li>Clothings</li>
          <li>Shoes</li>
          <li>Slippers</li>
          <li>Fabrics</li>
          <li>Hair Accessories</li>
          <li>Bags</li>
        </ul>
        <hr />
      </div>
    </>,
    document.querySelector('#mobile-menu')
  );
};

const mapState = state => {
  return {
    visibility: getMobileMenuVisibility(state),
  };
};

export default connect(mapState, { setMobileMenuVisiblity })(MobileMenu);
