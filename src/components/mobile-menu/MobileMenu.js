import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './MobileMenu.scss';

import { getMobileMenuVisibility } from '../../redux/selectors';
import { setMobileMenuVisiblity } from '../../redux/actions';
// import { ReactComponent as Logo } from '../../asset/bnd-logo.svg';
import Categories from '../categories/Categories';

const MobileMenu = ({ visibility, setMobileMenuVisiblity }) => {
  // const history = useHistory();

  const visible = visibility ? 'visible' : '';

  return createPortal(
    <>
      <div
        className={`mobile-menu-overlay ${visible}`}
        onClick={() => setMobileMenuVisiblity()}></div>
      <div className={`mobile-menu ${visible}`}>
        {/* <div
          className="mobile-logo"
          onClick={() => {
            setMobileMenuVisiblity();

            history.push('/');
          }}>
          <Logo />
        </div> */}
        {/* <hr /> */}
        <Categories isMobileScreen={true} />
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
