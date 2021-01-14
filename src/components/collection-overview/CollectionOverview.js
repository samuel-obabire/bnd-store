import './CollectionOverview.scss'

import Collection from '../collection/Collection'
import { generateId } from '../utils'

const CollectionOverview = ({ collections }) => {
  const render = Object.values(collections).map(collection => {
    return (
      <Collection
        key={generateId()}
        products={collection}
        title={Object.values(collection)[0]?.category}
      />
    )
  })

  return <main className="collection-overview container">{render}</main>
}

export default CollectionOverview
