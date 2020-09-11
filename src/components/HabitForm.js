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
      typeOfHabit: 'keep it'
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.toggleTypeOfHabit = this.toggleTypeOfHabit.bind(this)
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }
  
  handleCloseModal () {
    this.setState({ showModal: false })
  }
  
  toggleTypeOfHabit () {
    this.state.typeOfHabit === 'keep it' 
      ? this.setState({ typeOfHabit: 'lose it' })
      : this.setState({ typeOfHabit: 'keep it' })
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
            <button className='close-habit-btn' onClick={this.handleCloseModal}><GoX /></button>
            <form className='add-habit-form'>
              <label className='form-label'>
                <h4>Habit name:</h4>
                <span className='form-text'>maximum 30 characters</span>
                <input type="text" name="habit" />
              </label>
              <label className='form-label'>
                <h4>Choose color:</h4>
                <TwitterPicker
                  style={{marginTop: '20px'}}
                />
              </label>
              <label className='form-label'>
                <h4>Do you want to keep or lose the habit?</h4>
                <input type='checkbox' onClick={this.toggleTypeOfHabit} />
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