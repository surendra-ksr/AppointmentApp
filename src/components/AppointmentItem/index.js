// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFavorite} = props
  const {id, titleIn, dateIn, isFavorite} = appointmentDetails

  const onFavButton = () => {
    toggleFavorite(id)
  }

  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="liDiv">
      <div className="li-top">
        <p className="li-h1">{titleIn}</p>
        <button type="button" testid="star" onClick={onFavButton}>
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="li-date">{`Date: ${dateIn}`}</p>
    </li>
  )
}

export default AppointmentItem
