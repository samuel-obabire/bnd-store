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
  const { isMedia, vw } = useMediaQuery('(max-width: 697px)')

  const limit = isMedia ? 10 : vw > 697 && vw < 930 ? 4 : 5

  useEffect(() => {
    getCollections(limit)
  }, [getCollections, isMedia, vw, limit])

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
