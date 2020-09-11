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
      colorPicker: '#fff',
      typeOfHabit: 'keep it',
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
    this.state.typeOfHabit === 'keep it' 
      ? this.setState({ 
        typeOfHabit: 'lose it',
        isPositive: false 
        })
      : this.setState({ 
        typeOfHabit: 'keep it',
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
                <h4>Habit:</h4>
                <span className='form-text'>maximum 30 characters</span>
                <input 
                  type="text" 
                  name="habit" 
                  value={this.state.valueHabit}
                  onChange={this.handleChange}
                />
              </label>
              <label className='form-label'>
                <h4>Choose color:</h4>
                <TwitterPicker
                  color={this.state.colorPicker}
                  onChangeComplete={this.handleChangeColor}
                />
              </label>
              <label className='form-label'>
                <h4>Do you want to keep or lose the habit?</h4>
                {this.state.typeOfHabit === 'keep it'
                  ? <input type='checkbox' onClick={this.toggleTypeOfHabit} checked />
                  : <input type='checkbox' onClick={this.toggleTypeOfHabit} />
                }
                <span className='form-text'>{this.state.typeOfHabit}</span>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </ReactModal>

      </>
    )
  }
}