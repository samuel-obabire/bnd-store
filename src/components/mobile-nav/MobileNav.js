import { createPortal } from 'react-dom'
import './MobileNav.scss'
import { ReactComponent as HomeIcon } from '../../asset/home.svg'
import { ReactComponent as SavedIcon } from '../../asset/saved-icon.svg'
import { ReactComponent as ShopIcon } from '../../asset/shop.svg'
import { ReactComponent as CategoryIcon } from '../../asset/category.svg'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { setMobileMenuVisiblity } from '../../redux/actions'
import { connect } from 'react-redux'

const buildThresholdList = () => {
  let thresholds = []
  let numSteps = 50

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}

let prevScrollValue = 0

const MobileNav = ({ setMobileMenuVisiblity }) => {
  const ref = useRef()
  const [shouldShow, setshouldShow] = useState(true)

  useEffect(() => {
    if (!window.IntersectionObserver) return

    let options = {
      rootMargin: '50%',
      threshold: buildThresholdList()
    }

    const intersectionCallback = entries => {
      const { y } = entries[0].boundingClientRect

      if (
        y < prevScrollValue &&
        y < -70 &&
        ref.current.classList.contains('visible')
      ) {
        setshouldShow(false)
      } else if (
        !ref.current.classList.contains('visible') &&
        y > prevScrollValue
      ) {
        setshouldShow(true)
      }

      prevScrollValue = y
    }

    const observer = new IntersectionObserver(intersectionCallback, options)
    observer.observe(document.querySelector('#root'))

    return () => {
      observer.disconnect()
    }
  }, [])

  return createPortal(
    <div ref={ref} className={`mobile-nav ${shouldShow ? 'visible' : ''}`}>
      <Link to="/" className="icon-wrapper">
        <div className="icon">
          <HomeIcon />
        </div>
        Home
      </Link>
      <div className="icon-wrapper">
        <div className="icon">
          <SavedIcon />
        </div>
        Saved
      </div>
      <Link to="/shop" className="icon-wrapper">
        <div className="icon">
          <ShopIcon />
        </div>
        Shop
      </Link>
      <div className="icon-wrapper" onClick={setMobileMenuVisiblity}>
        <div className="icon">
          <CategoryIcon />
        </div>
        Categories
      </div>
    </div>,
    document.querySelector('#mobile-nav')
  )
}

export default connect(null, { setMobileMenuVisiblity })(MobileNav)
