import React from 'react';
import ExampleCal from './ExampleCal'
import { FaCircle, FaTimes, FaRegTrashAlt } from 'react-icons/fa';

export default class Calendar extends React.Component {
  constructor (props) {
    super (props)

    this.renderDateFormat = this.renderDateFormat.bind(this)
    this.setDateTimesToZero = this.setDateTimesToZero.bind(this)
    this.makeDateList = this.makeDateList.bind(this)
  }
  
  renderDateFormat (isoDate) {
    const date = new Date(isoDate)
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
  }

  setDateTimesToZero (date) {
    date.setHours(3, 0, 0, 0)
    return date
  }

  makeDateList (monday, mondayISO) {
    const dateArray = []
    dateArray.push(mondayISO)

    for (let i=1; i<7; i++) {
      const weekday = new Date(monday)
      weekday.setDate(monday.getDate() + i)
      this.setDateTimesToZero(weekday)
      const weekdayISO = weekday.toISOString()
      dateArray.push(weekdayISO)
    }
    return dateArray
  }

  render () {
    const { habits, dates, removeHabit, toggleHabit, now } = this.props
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // getting monday using now variable and setting it to 0

    const dayOfWeek = now.getDay() - 1
    const monday = new Date(now)
    monday.setDate(now.getDate() - dayOfWeek)
    this.setDateTimesToZero(monday)
    const mondayISO = monday.toISOString()

    // creating an array for the week using monday date object 

    const dateList = this.makeDateList(monday, mondayISO)

    return (
      <div>
        <ul className='list-habits'>
        <div className='separating-line'></div>
          <div className='row week-days'>
            {weekDays.map((day, index) => (
              <li key={index}>
                {day}
              </li>
            ))}
          </div>
          <div className='all-habits'>
          {habits.length === 0 && <ExampleCal />}
            {habits.map((habit, index) => (
              <div className='row'>
                <li key={index} className='calendar-habit'>
                  {habit.isPositive
                    ? <>
                        <FaCircle 
                          className='icon-habit'
                          style={{color: habit.color}} 
                        /> 
                        {habit.title}
                      </>
                    : <>
                        <FaTimes 
                          className='icon-habit'
                          style={{color: habit.color}} 
                        /> 
                        {habit.title}
                      </>
                  }
                </li>
                {dateList.map((date) => (
                  dates[date] && dates[date].includes(habit.title)
                    ? <div className='calendar-box'>
                        <button 
                          aria-label={`unselect habit: ${habit.title} on ${this.renderDateFormat(date)}`}
                          title={this.renderDateFormat(date)}
                          onClick={() => toggleHabit(habit.title, date)}
                          className='calendar-btn' 
                          style={{backgroundColor: habit.color}}>
                        </button>
                      </div>
                    : <div className='calendar-box'>
                        <button 
                          aria-label={`select habit: ${habit.title} on ${this.renderDateFormat(date)}`}
                          title={this.renderDateFormat(date)}
                          onClick={() => toggleHabit(habit.title, date)} 
                          className='calendar-btn'>
                        </button>
                      </div>
                ))}
                <button 
                  className='trash-btn'
                  onClick={() => removeHabit(habit)}
                >
                    <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </ul>
      </div>
    )
  }
}