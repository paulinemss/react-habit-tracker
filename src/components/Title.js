import React from 'react';
import { GrFormClose } from 'react-icons/gr';

export default class Title extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      valueUser: '',
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.addUsername = this.addUsername.bind(this)
    this.removeUsername = this.removeUsername.bind(this)
  }

  handleChange (event) {
    this.setState({ valueUser: event.target.value })
  }

  addUsername (event) {
    if(event.key === 'Enter') {
      this.setState({ username: this.state.valueUser })
    }
  }

  removeUsername () {
    this.setState({ username: '' })
  }

  render () {
    const now = new Date()
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
      <>
        <div className='title'>
          <span>hey there,</span>
          {this.state.username !== ''
            ? <span className='username'>
                {this.state.username} 
                <button
                  className='remove-user-btn'
                  onClick={this.removeUsername}
                >
                  <GrFormClose />
                </button>
              </span>
            : <form>
                <input 
                  type='text'
                  className='input-username'
                  name='username'
                  value={this.state.valueUser}
                  onChange={this.handleChange}
                  onKeyDown={this.addUsername}
                  maxLength='20'
                />
              </form>
          }
        </div>
        <div className='today-date'>
          {weekdays[now.getDay()]} {now.getDate()} {months[now.getMonth()]}
        </div>
      </>
    )
  }
}