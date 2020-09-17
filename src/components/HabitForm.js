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
    transform             : 'translate(-50%, -50%)'
  }
};

export default class HabitForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      valueHabit: '',
      colorPicker: '#FFC0CB',
      typeOfHabit: 'build the habit',
      isPositive: true
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
    this.setState({ valueHabit: event.target.value })
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
                  className='input-habit-text'
                  name='habit'
                  maxLength='15'
                  value={this.state.valueHabit}
                  onChange={this.handleChange}
                />
              </label>
              <label className='form-label'>
                <h4 className='color-title'>choose a matching color</h4>
                <TwitterPicker
                  color={this.state.colorPicker}
                  onChangeComplete={this.handleChangeColor}
                />
              </label>
              <label className='form-label'>
                <h4>you're trying to</h4>
                <div className='checkbox'>
                  {this.state.typeOfHabit === 'build the habit'
                    ? <input className='checkbox-form' type='checkbox' onClick={this.toggleTypeOfHabit} checked />
                    : <input className='checkbox-form' type='checkbox' onClick={this.toggleTypeOfHabit} />
                  }
                  <span className='checkbox-text'>{this.state.typeOfHabit}</span>
                </div>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </ReactModal>

      </>
    )
  }
}