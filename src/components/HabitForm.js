import React from 'react';
import ReactModal from 'react-modal';
import { GoPlus, GoX } from 'react-icons/go'; 
import { TwitterPicker } from 'react-color';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  },
  overlay: {zIndex: 1000}
};

export default class HabitForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      valueHabit: '',
      colorPicker: '#017CFF',
      typeOfHabit: 'build the habit',
      isPositive: true,
      btnOff: false,
      showAlert: 'hidden'
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.toggleTypeOfHabit = this.toggleTypeOfHabit.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }
  
  handleCloseModal () {
    this.setState({ showModal: false })
  }

  handleChangeColor (color) {
    this.setState({ colorPicker: color.hex })
  }
  
  handleChange (event) {
    const newHabit = event.target.value
    this.setState({ valueHabit: newHabit })
    newHabit.trim()

    if(this.props.habits.some(habit => habit.title.toLowerCase() === newHabit.toLowerCase().trim())){
      this.setState({ 
        btnOff: true,
        showAlert: 'visible'
      })
    } else {
      this.setState({ 
        btnOff: false,
        showAlert: 'hidden'
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ showModal: false })
    const habit = {
      title: this.state.valueHabit,
      color: this.state.colorPicker,
      isPositive: this.state.isPositive
    } 
    this.props.addHabit(habit)
    this.setState({ valueHabit: '' })
  }

  toggleTypeOfHabit () {
    this.state.typeOfHabit === 'build the habit' 
      ? this.setState({ 
        typeOfHabit: 'lose the habit',
        isPositive: false 
        })
      : this.setState({ 
        typeOfHabit: 'build the habit',
        isPositive: true 
        })
  }

  render () {
    return (
      <>

        <div className='add-habit-main'>
          <button 
            aria-label='Add new habit to the calendar'
            className='add-habit-btn' 
            onClick={this.handleOpenModal}
          >
            <GoPlus
              style={{marginRight: '5px'}}
            /> 
            Add Habit
          </button>
        </div>

        <ReactModal isOpen={this.state.showModal} style={customStyles}>
          <div className='add-habit-modal'>
            <button className='close-habit-btn' onClick={this.handleCloseModal}>
              <GoX />
            </button>
            <form className='add-habit-form' onSubmit={this.handleSubmit}>
              <label className='form-label'>
                <h4>enter your new habit</h4>
                <span className='form-text'>max. 15 characters</span>
                <input 
                  type='text'
                  className={`input-habit-text ${this.state.btnOff ? 'border-alert' : ''}`}
                  name='habit'
                  maxLength='15'
                  value={this.state.valueHabit}
                  onChange={this.handleChange}
                />
                <span className='alert' style={{visibility: this.state.showAlert}}>
                  you are already tracking this habit
                </span>
              </label>
              <label className='form-label'>
                <h4 className='color-title'>choose a matching color</h4>
                <TwitterPicker
                  color={this.state.colorPicker}
                  onChangeComplete={this.handleChangeColor}
                />
              </label>
              <label className='form-label'>
                <h4 className='positivity-title'>you're trying to</h4>
                <div className='checkbox'>
                  {this.state.typeOfHabit === 'build the habit'
                    ? <input className='checkbox-form' type='checkbox' onClick={this.toggleTypeOfHabit} checked />
                    : <input className='checkbox-form' type='checkbox' onClick={this.toggleTypeOfHabit} />
                  }
                  <span className='checkbox-text'>{this.state.typeOfHabit}</span>
                </div>
              </label>
              <input 
                className='submit-form-btn' 
                type="submit" 
                value='Submit'
                disabled={this.state.valueHabit.trim() ? this.state.btnOff : true}
              />
            </form>
          </div>
        </ReactModal>

      </>
    )
  }
}