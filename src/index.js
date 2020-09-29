import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title'
import HabitForm from './components/HabitForm'
import WeekView from './components/WeekView'
import Calendar from './components/Calendar'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      now: new Date(),
      dates: {
        '2020-08-31T13:29:22+0000': ['Read', 'Workout', 'Alcohol'],
        '2020-09-01T13:29:22+0000': ['Workout', 'Alcohol'],
        '2020-09-02T13:29:22+0000': ['Read', 'Workout', 'Alcohol'],
        '2020-09-03T13:29:22+0000': ['Read', 'Meditate', 'Alcohol'],
        '2020-09-04T13:29:22+0000': ['Read', 'Workout', 'Meditate'],
        '2020-09-05T13:29:22+0000': ['Workout'],
        '2020-09-06T13:29:22+0000': ['Read', 'Workout', 'Meditate', 'Alcohol']
      },
      habits: []
    }

    this.addHabit = this.addHabit.bind(this)
    this.removeHabit = this.removeHabit.bind(this)
    this.toggleHabit = this.toggleHabit.bind(this)
    this.toggleWeek = this.toggleWeek.bind(this)
  }

  componentDidMount () {
    const habitData = localStorage.getItem('habits');
    console.log(habitData);
    if (habitData) {
      const parsedData = JSON.parse(habitData)
      this.setState({ habits: parsedData })
    } else {
      this.setState({ habits: [{
        title: 'Read',
        color: '#ffac01',
        isPositive: true
      }] })
    }
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
    localStorage.setItem('habits', habitsCopy)
  }

  toggleHabit (habit, date) {
    let newCompletedHabits = []

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

  render() {
    return (
      <>
        <Title 
          now={this.state.now}
        />
        <HabitForm 
          addHabit={this.addHabit}
        />
        <WeekView 
          now={this.state.now}
          toggleWeek={this.toggleWeek}
        />
        <Calendar 
          habits={this.state.habits} 
          dates={this.state.dates} 
          toggleHabit={this.toggleHabit} 
          removeHabit={this.removeHabit}
        />
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)