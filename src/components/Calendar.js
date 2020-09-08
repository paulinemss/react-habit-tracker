import React from 'react';
import { FaCircle, FaTimes } from "react-icons/fa";

export default class Calendar extends React.Component {
  render () {
    const { habits, dates, toggleHabit } = this.props
    const dateList = Object.keys(dates)

    return (
      <div>
        <ul className='list-habits'>
          {habits.map((habit, index) => (
            <div className='row'>
              <li key={index}>
                {habit.isPositive
                  ? <span><FaCircle style={{color: habit.color}} /> {habit.title}</span>
                  : <span><FaTimes style={{color: habit.color}} /> {habit.title}</span>
                }
              </li>
              {dateList.map((date) => (
                <div className='calendar-box'>
                  {dates[date].includes(habit.title)
                  ? <button onClick={() => toggleHabit(habit.title, date)} className='btn' style={{backgroundColor: habit.color}}></button>
                  : <button onClick={() => toggleHabit(habit.title, date)} className='btn'></button>}
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
    )
  }
}