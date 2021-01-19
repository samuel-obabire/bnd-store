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
        marginTop: '8rem',
        marginBottom: '2rem',
        padding: '1rem'
      }}>
      <div
        style={{
          width: '30%',
          maxWidth: '14rem',
          height: 'auto',
          margin: '0 auto'
        }}>
        <ErrorImage />
      </div>
      <div
        style={{ fontSize: '1.13rem', fontWeight: '500', textAlign: 'center' }}>
        Not the page you are looking for? Go to <Link to="/shop">shop</Link>
      </div>
    </div>
  )
}

export default Error
