import './ItemsCollection.scss'

import { ReactComponent as DeleteIcon } from '../../asset/delete.svg'
import { ReactComponent as PlusIcon } from '../../asset/plus.svg'
import { ReactComponent as MinusIcon } from '../../asset/minus.svg'

const ItemsCollection = ({ items, decrement, increment, remove }) => {
  const collection = items.map(item => (
    <div className="item-collection" key={item.id}>
      <div className="item-wrapper">
        <div className="image-wrapper">
          <img src={item.image} alt="" />
        </div>
        <div className="item-info">
          <h2>{item.title}</h2>
          <div>Price: {item.price * item.quantity}</div>
          <div>Quantity: {item.quantity}</div>
          <div>Size: {'oneFits'}</div>
        </div>
      </div>
      <div className="item-controls">
        <div className="icon" onClick={() => remove(item)}>
          <DeleteIcon />
        </div>
        <div
          className="icon"
          style={item.quantity === 1 ? { opacity: '0.2' } : {}}
          onClick={() => item.quantity > 1 && decrement(item)}>
          <MinusIcon />
        </div>
        <div className="icon">{item.quantity}</div>
        <div
          className="icon"
          onClick={() => {
            increment(item)
          }}>
          <PlusIcon />
        </div>
      </div>
    </div>
  ))

  return collection
}

export default ItemsCollection
