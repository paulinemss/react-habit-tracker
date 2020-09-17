import React from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';

export default class Calendar extends React.Component {
  constructor (props) {
    super (props)

    this.renderDateFormat = this.renderDateFormat.bind(this)
  }
  
  renderDateFormat (isoDate) {
    const date = new Date(isoDate)
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
  }

  render () {
    const { habits, dates, toggleHabit } = this.props
    const dateList = Object.keys(dates)
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
      <div>
        <ul className='list-habits'>
          <div className='row week-days'>
            {weekDays.map((day, index) => (
              <li key={index}>
                {day}
              </li>
            ))}
          </div>
          <div className='all-habits'>
          {habits.map((habit, index) => (
            <div className='row'>
              <li key={index}>
                {habit.isPositive
                  ? <span className='calendar-habit'>
                      <FaCircle 
                        className='icon-habit'
                        style={{color: habit.color}} 
                      /> 
                      {habit.title}
                    </span>
                  : <span className='calendar-habit'>
                      <FaTimes 
                        className='icon-habit'
                        style={{color: habit.color}} 
                      /> 
                      {habit.title}
                    </span>
                }
              </li>
              {dateList.map((date) => (
                <div className='calendar-box'>
                  {dates[date].includes(habit.title)
                    ? <button 
                        aria-label={`unselect habit: ${habit.title} on ${this.renderDateFormat(date)}`}
                        onClick={() => toggleHabit(habit.title, date)}
                        className='calendar-btn' 
                        style={{backgroundColor: habit.color}}>
                      </button>
                    : <button 
                        aria-label={`select habit: ${habit.title} on ${this.renderDateFormat(date)}`}
                        onClick={() => toggleHabit(habit.title, date)} 
                        className='calendar-btn'>
                      </button>
                  }
                </div>
              ))}
            </div>
          ))}
          </div>
        </ul>
      </div>
    )
  }
}