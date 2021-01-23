import { DISPLAY_NOTI_MODAL } from '../actions/types'

const INITIAL_STATE = {
  visible: false,
  msg: '',
  type: ''
}

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY_NOTI_MODAL:
      const { type, msg } = action.payload
      return { ...state, visible: !state.visible, msg, type }
    default:
      return state
  }
}

export default notificationReducer
