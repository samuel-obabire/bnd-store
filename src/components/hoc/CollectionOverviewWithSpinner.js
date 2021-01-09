import { connect } from 'react-redux'
import { useEffect } from 'react'

import { getCollections } from '../../redux/actions'
import Spinner from '../spinner/Spinner'

const CollectionOverviewWithSpinner = ({
  Component,
  getCollections,
  collections
}) => {
  useEffect(() => {
    getCollections()
  }, [getCollections])

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
