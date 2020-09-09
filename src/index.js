import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title'
import Calendar from './components/Calendar'

const habits = [{
  title: 'Read',
  color: '#ffac00',
  isPositive: true
}, {
  title: 'Workout',
  color: '#9c5cff',
  isPositive: true
}, {
  title: 'Meditate',
  color: '#52d3e4',
  isPositive: true
}, {
  title: 'Alcohol',
  color: '#ff6c00',
  isPositive: false
}]

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        '2020-08-31T13:29:22+0000': ['Read', 'Workout', 'Alcohol'],
        '2020-09-01T13:29:22+0000': ['Workout', 'Alcohol'],
        '2020-09-02T13:29:22+0000': ['Read', 'Workout', 'Alcohol'],
        '2020-09-03T13:29:22+0000': ['Read', 'Meditate', 'Alcohol'],
        '2020-09-04T13:29:22+0000': ['Read', 'Workout', 'Meditate'],
        '2020-09-05T13:29:22+0000': ['Workout'],
        '2020-09-06T13:29:22+0000': ['Read', 'Workout', 'Meditate', 'Alcohol']
      }
    }

    this.toggleHabit = this.toggleHabit.bind(this)
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

  render() {
    return (
      <>
        <Title />
        <Calendar 
          habits={habits} 
          dates={this.state.dates} 
          toggleHabit={this.toggleHabit} 
        />
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)