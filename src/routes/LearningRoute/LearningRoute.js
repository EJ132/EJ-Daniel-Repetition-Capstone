import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './LearningRoute.css'
import './LearningValidation.css'

class LearningRoute extends Component {

  state = {
    value: '',
  }

  componentWillMount(){
    AuthApiService.getHeadofLanguages()
      .then(resJSON => this.setState({
        head: resJSON
      }))
  }

  handleChange = ev => {
    this.setState({
      value: ev.target.value.toLowerCase()
    })
  }

  handleGuess = e => {
    e.preventDefault()

    AuthApiService.validateGuess(this.state.value)
      .then(resJSON => this.setState({
        result: resJSON
      }))

    this.displayValidation()
    // console.log(this.state.value)
    // console.log(this.state.result)
  }

  displayValidation = () => {

    if(!this.state.result){
      return 'no answer'
    } else if (this.state.result.isCorrect === true){
      return 'true_validation'
    } else {
      return 'false_validation'
    }
  }

  hanldeAnotherWord = () => {

    AuthApiService.getHeadofLanguages()
      .then(resJSON => this.setState({
        head: resJSON,
        next_result: this.state.result.nextWord,
        current_score: this.state.result.totalScore, 
        result: null,
        value: ''
      }))

    // console.log('give another word')
  }

  displayNextWord = () => {
    if(this.state.next_result){
      return `${this.state.next_result}`
    } else {
      return `${this.state.head.nextWord}`
    }
  }

  displayCurrentScore = () => {
    if(this.state.current_score){
      return `${this.state.current_score}`
    } else {
      return `${this.state.head.totalScore}`
    }
  }

  render() {
    console.log(this.state)
    return (
      <section className='learn_section'>
        {this.state.result ? 
        
        <div className='flasCard_position'>
          <div className='flashCard'>
            <main className='DisplayScore'>
              <h2 id={this.state.result.isCorrect ? 'correct' : 'incorrect'}>{this.state.result.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
              <p>{this.state.result.isCorrect ? `Your total score is: ${this.state.result.totalScore}` : `Your total score is: ${this.state.result.totalScore}`}</p>
            </main>
            <div className='DisplayFeedback'>
              <p>{this.state.result.isCorrect ? `The correct translation for ${this.state.head.nextWord} was ${this.state.result.answer} and you chose ${this.state.value}!` 
                  : 
                  `The correct translation for ${this.state.head.nextWord} was ${this.state.result.answer} and you chose ${this.state.value}!`
                 }</p>
              <button onClick={this.hanldeAnotherWord}>Try another word!</button>
            </div>
          </div>
        </div>
          
          
          
        : 
          
          
          
          
        <div className='flashCard_position'>
          <div className='flashCard'>
          <h2 id='hidden'>Translate the word:</h2>
          <span>{this.state.head ? this.displayNextWord() : 'Loading...'}</span>
          <h5 id={this.state.result ? this.displayValidation() : null}>{this.state.result ? 'Answer right or wrong' : null}</h5>
          <p>Your total score is: {this.state.head ? this.displayCurrentScore() : 'Loading...'}</p>
          <main className='flash_main_pre'>
              <h3>More Information</h3>
              <ul>
                <li>You have answered this word correctly {this.state.head ? this.state.head.wordCorrectCount : 'Loading...'} times.</li>
                <li>You have answered this word incorrectly {this.state.head ? this.state.head.wordIncorrectCount : 'Loading...'} times.</li>
              </ul>
          </main>
          <form onSubmit={this.handleGuess}>
            <label id='hidden' htmlFor='learn-guess-input'>What's the translation for this word?</label>
            <input onChange={this.handleChange} value={this.state.value} placeholder='type english version' id='learn-guess-input' type='text' required></input>
            <button type='submit'>Submit your answer</button>
          </form>
          </div>
        </div>}
      </section>
    );
  }
}

export default LearningRoute