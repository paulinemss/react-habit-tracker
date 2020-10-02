import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title'
import HabitForm from './components/HabitForm'
import WeekView from './components/WeekView'
import Calendar from './components/Calendar'
import DailyView from './components/DailyView'
import { CgMenu } from 'react-icons/cg';

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: new Date(),
      dates: {},
      habits: [],
      isOpen: false
    }

    this.addHabit = this.addHabit.bind(this)
    this.removeHabit = this.removeHabit.bind(this)
    this.toggleHabit = this.toggleHabit.bind(this)
    this.toggleWeek = this.toggleWeek.bind(this)
    this.toggleDailyView = this.toggleDailyView.bind(this)
  }

  componentDidMount () {
    const habitData = localStorage.getItem('habits');
    const datesData = localStorage.getItem('dates');

    if (habitData) {
      const parsedHabitData = JSON.parse(habitData)
      this.setState({ habits: parsedHabitData })
    }

    if (datesData) {
      const parsedDateData = JSON.parse(datesData)
      this.setState({ dates: parsedDateData })
    }
  }

  componentDidUpdate () {
    localStorage.setItem('dates', JSON.stringify(this.state.dates))
  }

  addHabit (habit) {
    const habitsCopy = this.state.habits.slice()
    habitsCopy.push(habit)
    this.setState({ habits: habitsCopy })
    localStorage.setItem('habits', JSON.stringify(habitsCopy))
  }

  removeHabit (habit) {
    const habitsCopy = this.state.habits.filter((x) => {
      if (x.title !== habit.title) {
        return x; 
      }
    })
    this.setState({ habits: habitsCopy })
    localStorage.setItem('habits', JSON.stringify(habitsCopy))
  }

  toggleHabit (habit, date) {
    let newCompletedHabits = []

    if (!this.state.dates.hasOwnProperty(date)) {
      this.setState(prevState => ({
        dates: {
          ...prevState.dates,
          [date]: [habit]
        }
      }))
      return; 
    }

    if (this.state.dates[date].includes(habit)) {
      newCompletedHabits = this.state.dates[date].filter((x) => x !== habit)

      this.setState(prevState => ({
        dates: {
          ...prevState.dates,
          [date]: newCompletedHabits
        }
      }))
    } else {
      newCompletedHabits = this.state.dates[date].slice()
      newCompletedHabits.push(habit)

      this.setState(prevState => ({
        dates: {
          ...prevState.dates,
          [date]: newCompletedHabits
        }
      }))
    }
  }

  toggleWeek (direction) {
    const newDate = new Date(this.state.now); 

    if (direction === 'left') {
      newDate.setDate(newDate.getDate() - 7) 

      this.setState({ 
        now: newDate
      })
    } else if (direction === 'right') {
      newDate.setDate(newDate.getDate() + 7) 
      
      this.setState({ 
        now: newDate
      })
    }
  }

  toggleDailyView () {
    if (this.state.isOpen) {
      this.setState({ isOpen: false })
    } else {
      this.setState({ isOpen: true })
    }
  }

  render() {
    return (
      <div className='main'>
        <div className={`left-view ${this.state.isOpen ? 'blur' : ''}`}>
          <Title 
            now={this.state.now}
          />
          <HabitForm 
            habits={this.state.habits}
            addHabit={this.addHabit}
          />
          <WeekView 
            now={this.state.now}
            toggleWeek={this.toggleWeek}
          />
          <Calendar 
            now={this.state.now}
            habits={this.state.habits} 
            dates={this.state.dates} 
            toggleHabit={this.toggleHabit} 
            removeHabit={this.removeHabit}
          />
        </div>
        <div className='daily-view'>
          <button className='daily-view-btn' onClick={this.toggleDailyView}>
            <CgMenu />
          </button>
        </div>
        <div className={`right-view ${this.state.isOpen ? 'open' : 'closed'}`}>
          <DailyView 
            habits={this.state.habits}
            dates={this.state.dates}
            toggleHabit={this.toggleHabit} 
            isOpen={this.state.isOpen}
            toggleDailyView={this.toggleDailyView}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)