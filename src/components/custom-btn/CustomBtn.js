import './CustomBtn.scss'

const CustomBtn = ({
  className = '',
  onClick,
  text,
  additionalStyles = {}
}) => {
  return (
    <button
      className={`custom-btn ${className}`}
      style={additionalStyles}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomBtn
