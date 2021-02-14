import { useHistory, useLocation } from 'react-router-dom'
import { ReactComponent as BackIcon } from '../asset/backIcon.svg'
import useMediaQuery from '../hooks/useMediaQuery'

const Back = () => {
  const location = useLocation()
  const history = useHistory()
  const { isMedia } = useMediaQuery('(max-width: 34rem)')

  if (location.pathname === '/' || !isMedia) return null

  const onClick = () => {
    history.goBack(1)
  }

  return (
    <div
      className="container"
      style={{
        position: 'absolute',
        top: '6.6rem',
        left: 9,
        padding: 8,
        width: 40,
        cursor: 'pointer'
      }}
      onClick={onClick}>
      <BackIcon />
    </div>
  )
}

export default Back
