import { Link } from 'react-router-dom'
import { ReactComponent as ErrorImage } from '../asset/404.svg'

const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        padding: '1rem',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        margin: 'auto'
      }}>
      <h1
        style={{
          width: '50%',
          maxWidth: '20rem',
          height: 'auto',
          margin: '0 auto'
        }}>
        <ErrorImage />
      </h1>
      <h2
        style={{ fontSize: '1.13rem', fontWeight: '500', textAlign: 'center' }}>
        Not the page you are looking for? Go to <Link to="/shop">shop</Link>
      </h2>
    </div>
  )
}

export default Error
