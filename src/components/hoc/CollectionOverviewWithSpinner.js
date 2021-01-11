import { connect } from 'react-redux'
import { useEffect } from 'react'

import { getCollections } from '../../redux/actions'
import Spinner from '../spinner/Spinner'
import useMediaQuery from '../../hooks/useMediaQuery'

const CollectionOverviewWithSpinner = ({
  Component,
  getCollections,
  collections
}) => {
  const limit = useMediaQuery('(max-width: 500px)') ? 10 : 5

  useEffect(() => {
    getCollections(limit ? 10 : 4)
  }, [getCollections, limit])

  if (JSON.stringify(collections) === '{}') return <Spinner />

  return <Component collections={collections} />
}

const makeMapState = state => {
  return {
    collections: state.shop.categories
  }
}

export default connect(makeMapState, { getCollections })(
  CollectionOverviewWithSpinner
)
