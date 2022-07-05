// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], isStarred: false, titleIn: '', dateIn: ''}

  onTitleChange = event => {
    this.setState({titleIn: event.target.value})
  }

  onDateChange = event => {
    this.setState({dateIn: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleIn, dateIn} = this.state
    const reqDate = format(new Date(dateIn), 'dd MMMM yyyy, EEEE')
    const appObject = {
      id: uuidv4(),
      titleIn,
      dateIn: reqDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, appObject],
      titleIn: '',
      dateIn: '',
    }))
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onStarred = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  render() {
    const {titleIn, dateIn, isStarred} = this.state
    let {appointmentsList} = this.state
    const newClass = isStarred ? 'addColor' : ''
    const filteredList = isStarred
      ? appointmentsList.filter(eachItem => eachItem.isFavorite === true)
      : appointmentsList
    appointmentsList = filteredList
    return (
      <div className="main-div">
        <div className="inner-div">
          <div className="in-div">
            <div className="leftDiv">
              <h1 className="main-h1">Add Appointment</h1>
              <form className="formDiv" onSubmit={this.onAddButton}>
                <label htmlFor="title" className="labelItem">
                  TITLE
                </label>
                <input
                  onChange={this.onTitleChange}
                  placeholder="Title"
                  id="title"
                  value={titleIn}
                />
                <label htmlFor="date" className="labelItem">
                  DATE
                </label>
                <input
                  onChange={this.onDateChange}
                  type="date"
                  id="date"
                  value={dateIn}
                />
                <button className="addButton" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="rightDiv">
              <img
                className="main-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="botDiv">
            <div className="bot1">
              <h1 className="bot-h1">Appointments</h1>
              <button
                className={`startButton ${newClass}`}
                onClick={this.onStarred}
                type="button"
              >
                Starred
              </button>
            </div>
            <div>
              <ul className="ulDiv">
                {appointmentsList.map(eachItem => (
                  <AppointmentItem
                    key={eachItem.id}
                    toggleFavorite={this.toggleFavorite}
                    appointmentDetails={eachItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
