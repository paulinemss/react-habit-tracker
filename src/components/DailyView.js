import React from 'react';
import { weekdays, months } from '../constants.js'; 
import { HiChevronLeft, HiChevronRight, HiCheck } from 'react-icons/hi';

export default class DailyView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: new Date()
    }

    this.toggleDay = this.toggleDay.bind(this)
    this.isHabitCompleted = this.isHabitCompleted.bind(this)
  }

  toggleDay (direction) {
    console.log(direction)
  }

  isHabitCompleted (habit) {
    const today = this.state.now; 
    today.setHours(3, 0, 0, 0)
    const todayISO = today.toISOString()

    if (this.props.dates[todayISO].includes(habit.title)) {
      return true
    } else {
      console.log('couldnt find')
      return false 
    }
  }
  
  render () {
    const { habits, toggleHabit } = this.props
    const today = this.state.now; 
    today.setHours(3, 0, 0, 0)
    const todayISO = today.toISOString()

    return (
      <>
        <div className='daily-title'>
          <h2>{weekdays[this.state.now.getDay()]}, {months[this.state.now.getMonth()]} {this.state.now.getDate()}</h2>
          <div className='toggle-day'>
            <button className='toggle-week-btn' onClick={() => this.toggleDay('left')}>
              <HiChevronLeft />
            </button>
            <button className='toggle-week-btn' onClick={() => this.toggleDay('right')}>
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div className='daily-tasks'>
          <div className='daily-tasks-in'>
            {habits.map((habit) => (
              this.isHabitCompleted(habit) 
                ? <div
                    style={{backgroundColor: habit.color}}
                    className='daily-habit completed'
                  >
                    <h4>{habit.title}</h4>
                    <div className='completed-checkmark'>
                      <p><HiCheck /> Completed</p>
                      <button onClick={() => toggleHabit(habit.title, todayISO)}>
                        Undo
                      </button>
                    </div>
                  </div>
                : <div
                    style={{borderLeft: `4px solid ${habit.color}`}}
                    className='daily-habit todo'
                  >
                    <h4>{habit.title}</h4>
                    <button onClick={() => toggleHabit(habit.title, todayISO)}>
                      Mark Complete
                    </button>
                  </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}