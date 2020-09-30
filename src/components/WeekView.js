import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default class WeekView extends React.Component {
  render () {
    const { now, toggleWeek } = this.props

    const dayOfWeek = now.getDay() - 1

    const monday = new Date(now)
    monday.setDate(now.getDate() - dayOfWeek)

    const sunday = new Date(now)
    sunday.setDate(now.getDate() + (6 - dayOfWeek))

    return (
      <div className='week-view'>
        <div className='toggle-week'>
          <button className='toggle-week-btn' onClick={() => toggleWeek('left')}>
            <HiChevronLeft />
          </button>
          <button className='toggle-week-btn' onClick={() => toggleWeek('right')}>
            <HiChevronRight />
          </button>
        </div>
        <div className='week-date'>
          Mon, {monday.getDate()}/{monday.getMonth() + 1} - Sun, {sunday.getDate()}/{sunday.getMonth() + 1}
        </div>
      </div>
    )
  }
}