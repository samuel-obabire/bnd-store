import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCollections, setMobileMenuVisiblity } from '../../redux/actions'
import Spinner from '../spinner/Spinner'
import { parseString } from '../utils'

import './Categories.scss'

const Categories = ({
  categories,
  isMobileScreen,
  setMobileMenuVisiblity,
  getCollections
}) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const onBodyClick = e => {
      if (ref.current.contains(e.target) && e.target.nodeName !== 'LI') return

      setDropdownVisibility(false)
    }

    if (!dropdownVisibility) return

    document.body.addEventListener('click', onBodyClick)

    return () => document.body.removeEventListener('click', onBodyClick)
  }, [dropdownVisibility])

  useEffect(() => {
    getCollections()
  }, [getCollections])

  const onClick = e => {
    if (e.target.nodeName === 'A' || e.target.nodeName === 'LI')
      setMobileMenuVisiblity()
  }

  const renderCategories = Object.keys(categories).length ? (
    Object.keys(categories).map(category => {
      const string = parseString(category)

      return (
        <Link
          key={category}
          to={`/shop/collection/${string}?field=category&q=${string}`}>
          <li key={category}>{category}</li>
        </Link>
      )
    })
  ) : (
    <Spinner />
  )

  return (
    <>
      <div
        className="categories-header"
        onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        Categories
      </div>
      <div
        ref={ref}
        className={`categories-wrapper ${!isMobileScreen ? 'not-mobile' : ''} ${
          dropdownVisibility ? 'visible' : ''
        }`}>
        <ul className="categories-list" onClick={onClick}>
          {renderCategories}
        </ul>
      </div>
    </>
  )
}

const mapState = state => {
  return {
    categories: state.shop.categories
  }
}

export default connect(mapState, { setMobileMenuVisiblity, getCollections })(
  Categories
)
