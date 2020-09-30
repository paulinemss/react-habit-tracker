import React from 'react';

export default class ExampleCal extends React.Component {
  render () {
    return (
      <div>Example Calendar</div>
    )
  }
}

// {habits.map((habit, index) => (
//   <div className='row'>
//     <li key={index} className='calendar-habit'>
//       {habit.isPositive
//         ? <>
//             <FaCircle 
//               className='icon-habit'
//               style={{color: habit.color}} 
//             /> 
//             {habit.title}
//           </>
//         : <>
//             <FaTimes 
//               className='icon-habit'
//               style={{color: habit.color}} 
//             /> 
//             {habit.title}
//           </>
//       }
//     </li>
//     {dateList.map((date) => (
//       dates[date] && dates[date].includes(habit.title)
//         ? <div className='calendar-box'>
//             <button 
//               aria-label={`unselect habit: ${habit.title} on ${this.renderDateFormat(date)}`}
//               onClick={() => toggleHabit(habit.title, date)}
//               className='calendar-btn' 
//               style={{backgroundColor: habit.color}}>
//             </button>
//           </div>
//         : <div className='calendar-box'>
//             <button 
//               aria-label={`select habit: ${habit.title} on ${this.renderDateFormat(date)}`}
//               onClick={() => toggleHabit(habit.title, date)} 
//               className='calendar-btn'>
//             </button>
//           </div>
//     ))}
//     <button 
//       className='trash-btn'
//       onClick={() => removeHabit(habit)}
//     >
//         <FaRegTrashAlt />
//     </button>
//   </div>
// ))}