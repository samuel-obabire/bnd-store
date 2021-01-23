import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import './NotificationModal.scss'

const NotificationModal = ({ msg, type, visible }) => {
  if (!visible) return null

  const style =
    type === 'danger'
      ? {
          color: '#842029',
          backgroundColor: '#f8d7da',
          borderColor: '#f5c2c7'
        }
      : {}

  return createPortal(
    <>
      <div style={style} className="notification">
        {msg}
      </div>
    </>,
    document.querySelector('#noti')
  )
}

const mapState = ({ notification }) => {
  const { visible, msg, type } = notification

  return {
    visible,
    msg,
    type
  }
}
export default connect(mapState)(NotificationModal)
