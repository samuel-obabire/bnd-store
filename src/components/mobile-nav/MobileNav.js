import { createPortal } from 'react-dom'
import './MobileNav.scss'
import { ReactComponent as HomeIcon } from '../../asset/home.svg'
import { ReactComponent as SearchIcon } from '../../asset/search.svg'
import { ReactComponent as ShopIcon } from '../../asset/shop.svg'
import { ReactComponent as CategoryIcon } from '../../asset/category.svg'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

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

const MobileNav = () => {
  const ref = useRef()
  const [shouldShow, setshouldShow] = useState(true)

  useEffect(() => {
    if (!window.IntersectionObserver) return

    if (ref.current) ref.current = ref.current.disconnect()

    let options = {
      rootMargin: '100%',
      threshold: buildThresholdList()
    }

    const intersectionCallback = (entries, observer) => {
      const { y } = entries[0].boundingClientRect
      if (y < prevScrollValue) {
        setshouldShow(false)
      } else {
        setshouldShow(true)
      }
      prevScrollValue = y
    }

    const observer = new IntersectionObserver(intersectionCallback, options)
    observer.observe(document.querySelector('#root'))

    return () => ref.current.disconnect()
  }, [])

  return createPortal(
    <div className={`mobile-nav ${shouldShow ? 'visible' : ''}`}>
      <Link to="/" className="icon-wrapper">
        <div className="icon">
          <HomeIcon />
        </div>
        Home
      </Link>
      <div className="icon-wrapper">
        <div className="icon">
          <SearchIcon />
        </div>
        Search
      </div>
      <Link to="/shop" className="icon-wrapper">
        <div className="icon">
          <ShopIcon />
        </div>
        Shop
      </Link>
      <div className="icon-wrapper">
        <div className="icon">
          <CategoryIcon />
        </div>
        Categories
      </div>
    </div>,
    document.querySelector('#mobile-nav')
  )
}

export default MobileNav
