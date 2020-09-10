import React from 'react';
import { GoPlus } from 'react-icons/go'; 

export default class HabitForm extends React.Component {
  render () {
    return (
      <div className='add-habit'>
        <button>
          <GoPlus
            style={{marginRight: '5px'}}
          /> 
          Add Habit
        </button>
      </div>
    )
  }
}