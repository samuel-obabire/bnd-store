import './CustomBtn.scss'

const CustomBtn = ({ onClick, text, additionalStyles = {} }) => {
  return (
    <button className="custom-btn" style={additionalStyles} onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomBtn
