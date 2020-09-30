import React from 'react';
import { FaCircle, FaTimes } from 'react-icons/fa';

export default class ExampleCal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      habitsExamples: [
        {"title":"Read",
        "color":"#ffac00",
        "isPositive":true},
        {"title":"Workout",
        "color":"#9c5cff",
        "isPositive":true},
        {"title":"Meditate",
        "color":"#52d3e4",
        "isPositive":true},
        {"title":"Alcohol",
        "color":"#ff6c00",
        "isPositive":false}
      ],
      datesExamples: {
        "2020-09-28T01:00:00.000Z":["Read","Workout","Meditate","Alcohol"],
        "2020-09-30T01:00:00.000Z":["Read","Workout","Alcohol","Meditate"],
        "2020-10-01T01:00:00.000Z":["Read","Meditate"],
        "2020-10-04T01:00:00.000Z":["Read","Workout","Meditate"],
        "2020-09-29T01:00:00.000Z":["Workout","Alcohol"],
        "2020-10-03T01:00:00.000Z":["Workout","Alcohol"],
        "2020-10-02T01:00:00.000Z":["Meditate"]
      }
    }
  }
  render () {
    const { habitsExamples, datesExamples } = this.state
    const dateList = Object.keys(datesExamples)

    return (
      <div className='example-main'>
        <div className='example-background'></div>
        <div className='example-textbox'>
          <div className='text'>
            <h1>A new you.</h1>
            <p>Select 'Add habit' to start tracking habits now.</p>   
          </div>
        </div>
        <div className='example-calendar'>
          {habitsExamples.map((habit, index) => (
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
                datesExamples[date].includes(habit.title)
                  ? <div className='calendar-box'>
                      <button 
                        className='calendar-btn'
                        style={{backgroundColor: habit.color}}>
                      </button>
                    </div>
                  : <div className='calendar-box'>
                      <button 
                        className='calendar-btn'>
                      </button>
                    </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

