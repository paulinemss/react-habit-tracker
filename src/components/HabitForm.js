import React from 'react';
import { GoPlus } from 'react-icons/go'; 

export default class HabitForm extends React.Component {
  render () {
    return (
      <div aria-label='Add new habit to the calendar' className='add-habit'>
        <button className='add-habit-btn'>
          <GoPlus
            style={{marginRight: '5px'}}
          /> 
          Add Habit
        </button>
      </div>
    )
  }
}