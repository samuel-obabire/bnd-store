import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import './User.scss'

import { ReactComponent as OrderIcon } from '../../asset/orders.svg'
import { ReactComponent as SavedIcon } from '../../asset/saved-icon.svg'
import { ReactComponent as Settingsicon } from '../../asset/settings.svg'
import { ReactComponent as SignoutIcon } from '../../asset/logout.svg'
import { ReactComponent as UserIcon } from '../../asset/user-icon.svg'
import { auth } from '../utils/firebase'

const User = ({ user }) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const ref = useRef()
  const history = useHistory()

  useEffect(() => {
    const onBodyClick = e => {
      if (
        ref.current.contains(e.target) &&
        e.target.nodeName !== 'A' &&
        e.target.dataset.role !== 'sign out'
      )
        return

      setDropdownVisibility(false)
    }

    if (!dropdownVisibility) return

    document.body.addEventListener('click', onBodyClick)

    return () => {
      setDropdownVisibility(false)
      document.body.removeEventListener('click', onBodyClick)
    }
  }, [dropdownVisibility])

  const onClick = () => {
    if (!user) return history.push('/login')

    setDropdownVisibility(true)
  }

  return (
    <>
      <div className="nav-item  user-icon" onClick={onClick}>
        <UserIcon className="icon" />
        <div
          ref={ref}
          className={`user-dropdown ${dropdownVisibility ? 'visible' : ''}`}>
          <div className="dropdown-menu">
            {/* <div className="dropdown-option"> */}
            {/* <div> */}
            {/* <OrderIcon /> */}
            {/* </div> */}
            {/* <Link to="/user/orders">Orders</Link> */}
            {/* </div> */}
            {/* <div className="dropdown-option">
              <div>
                <SavedIcon />
              </div>
              <Link to="/user/saved">Saved</Link>
            </div> */}
            {/* <hr /> */}
            <div className="dropdown-footer">
              {/* <div className="dropdown-option">
                <div>
                  <Settingsicon />
                </div>
                <Link to="/user/settings">Settings</Link>
              </div> */}
              <div className="dropdown-option">
                <div>
                  <SignoutIcon />
                </div>
                <div
                  className="link"
                  onClick={() => auth.signOut()}
                  data-role="sign out">
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapState = state => {
  return {
    user: state.user.currentUser
  }
}

export default connect(mapState)(User)
